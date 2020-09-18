import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";
import { Bar } from "react-chartjs-2";

class Calculations extends Component {
  constructor(props) {
    super(props);
    // current [ticker,value,shares,percentage, color]
    // reallocated [ticker, value, shares, buysell, percentage, color]
    this.state = { currentAssets: [], reallocatedAssets: [] };
  }

  async componentDidMount() {
    console.log("mounting");
    for (var i = 0; i < this.props.data.length; i++) {
      var inputs = this.props.data[i];
      document.getElementById("ticker" + (i + 1)).value = inputs[0];
      document.getElementById("shares" + (i + 1)).value = inputs[1];
      document.getElementById("price" + (i + 1)).value = inputs[2];
      if (inputs.length > 3) {
        document.getElementById("target" + (i + 1)).value = inputs[3];
      }
    }
    await this.calculateCurrent();
    if (this.props.reallocate === "true") {
      this.calculateNew();
    }
  }

  calculateCurrent = () => {
    var inputs = this.props.data;
    var totalValue = 0;
    var currentAssets = [];

    inputs.forEach((arr) => {
      var value = arr[1] * arr[2];
      currentAssets.push([arr[0], arr[1], value]);
      totalValue += arr[1] * arr[2];
    });
    currentAssets.forEach((arr) => {
      arr.push(
        Math.round(((arr[2] / totalValue) * 100 + Number.EPSILON) * 100) / 100
      );
      arr.push("none");
    });

    this.setState({ currentAssets: currentAssets });
    this.setState({ totalValue: totalValue });
  };

  calculateNew = () => {
    var inputs = this.props.data;
    var newTotalValue = 0;
    var reallocatedAssets = [];

    inputs.forEach((arr) => {
      var ticker = arr[0];
      var newShares = Math.floor(
        ((arr[3] / 100) * this.state.totalValue) / arr[2]
      );
      var buySell = newShares - arr[1];
      var newValue = newShares * arr[2];

      newTotalValue += newValue;
      reallocatedAssets.push([ticker, newValue, newShares, buySell]);
    });
    reallocatedAssets.push([
      "CASH",
      this.state.totalValue - newTotalValue,
      0,
      0,
      0,
    ]);
    reallocatedAssets.forEach((arr) => {
      arr.push(
        Math.round(
          ((arr[1] / this.state.totalValue) * 100 + Number.EPSILON) * 100
        ) / 100
      );
      arr.push("none");
    });

    this.setState({ cash: this.state.totalValue - newTotalValue });
    this.setState({ reallocatedAssets: reallocatedAssets });
  };

  // https://www.npmjs.com/package/react-minimal-pie-chart
  pieChart = (arr, type) => {
    // var randomColor = require("randomcolor");
    var dataArray = [];
    var colorArray = randomColor({
      count: arr.length,
      luminosity: "light",
      hue: "blue",
    });
    arr.forEach((arr, index) => {
      arr.splice(-1, 1, colorArray[index]);
      dataArray.push({
        title: arr[0],
        value: type === "current" ? arr[3] : arr[4],
        color: colorArray[index],
      });
    });
    return (
      <div className="pieChart">
        <div className="chart">
          <PieChart
            className="piechart"
            data={dataArray}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            animate
            segmentsShift={0.75}
            center={[55, 55]}
            viewBoxSize={[110, 110]}
          />
        </div>

        <div className="chartColors">
          {arr.map((arr, index) => (
            <div className="color" key={index}>
              <div
                className="square"
                style={{
                  backgroundColor: arr[-1],
                }}
              ></div>
              {arr[0]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
  barChart = (arr, type) => {
    var tickers = [];
    var percentages = [];
    arr.forEach((arr) => {
      tickers.push(arr[0]);
      percentages.push(type === "current" ? arr[3] : arr[4]);
    });
    console.log(percentages);
    var state = {
      labels: tickers,
      datasets: [
        {
          label: "Percentage",
          backgroundColor: "lightgray",
          borderColor: "red",
          borderWidth: 2,
          data: percentages,
        },
      ],
    };
    return (
      <div className="barChart">
        <Bar
          data={state}
          options={{
            title: { display: true, text: "Percentage of Portfolio" },
            legend: {
              display: false,
            },
          }}
        />
      </div>
    );
  };

  table = (arr, type) => {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Value</th>
              <th>Shares</th>
              {type === "reallocated" ? <th>Buy/Sell</th> : null}
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((arr, index) => (
              <tr key={index}>
                <td>{arr[0]}</td>
                <td>{arr[1]}</td>
                <td>{arr[2]}</td>
                <td>{arr[3]}</td>
                {type === "reallocated" ? <td>{arr[4]}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  render() {
    return (
      <>
        <div className="calculations">
          <div className="currentAssets">
            <h1>Current Allocation</h1>
            {this.table(this.state.currentAssets, "current")}
            {this.pieChart(this.state.currentAssets, "current")}
            {this.barChart(this.state.currentAssets, "current")}
          </div>
          <div className="reallocatedAssets">
            <h1>New Allocation</h1>
            {this.table(this.state.reallocatedAssets, "reallocated")}
            {this.pieChart(this.state.reallocatedAssets, "reallocated")}
            {this.barChart(this.state.reallocatedAssets, "reallocated")}
          </div>
        </div>
      </>
    );
  }
}

export default Calculations;
