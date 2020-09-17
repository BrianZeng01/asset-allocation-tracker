import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";

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
    console.log(currentAssets);
  };

  calculateNew = () => {
    var inputs = this.props.data;
    var newTotalValue = 0;
    var cash = 0;
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
    console.log(reallocatedAssets, cash);
  };

  pieChart = (arr, type) => {
    var randomColor = require("randomcolor");
    var dataArray = [];
    var colorArray = randomColor({
      count: arr.length,
      luminosity: "light",
      hue: "blue",
    });
    arr.forEach((arr, index) => {
      arr[-1] = colorArray[index];
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
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            animate
          />
        </div>

        <div className="chartColors">
          {arr.map((arr) => (
            <div className="color">
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

  table = (arr, type) => {
    return (
      <div className="table">
        <table>
          <tr>
            <th>Ticker</th>
            <th>Value</th>
            <th>Shares</th>
            {type === "reallocated" ? <th>Buy/Sell</th> : null}
            <th>Percentage</th>
          </tr>
          {arr.map((arr, index) => (
            <tr key={index}>
              <td>{arr[0]}</td>
              <td>{arr[1]}</td>
              <td>{arr[2]}</td>
              <td>{arr[3]}</td>
              {type === "reallocated" ? <td>{arr[4]}</td> : null}
            </tr>
          ))}
        </table>
      </div>
    );
  };
  render() {
    return (
      <>
        <div className="calculations">
          <div className="currentAssets">
            {this.table(this.state.currentAssets, "current")}
            {this.pieChart(this.state.currentAssets, "current")}
          </div>
          <div className="reallocatedAssets">
            {this.table(this.state.reallocatedAssets, "reallocated")}
            {this.pieChart(this.state.reallocatedAssets, "reallocated")}
          </div>
        </div>
      </>
    );
  }
}

export default Calculations;
