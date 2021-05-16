import { PieChart } from "react-minimal-pie-chart";
import { Bar } from "react-chartjs-2";
import React, { Component } from "react";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { display: "percentage", sortBy: "numerically" };
  }

  changeDisplay = () => {
    this.state.display === "percentage"
      ? this.setState({ display: "value" })
      : this.setState({ display: "percentage" });
  };

  changeSort = () => {
    this.state.sortBy === "numerically"
      ? this.setState({ sortBy: "alphabetically" })
      : this.setState({ sortBy: "numerically" });
  };

  selectColor = (colorNum, colors) => {
    if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
    return "hsl(" + ((120 + colorNum * (360 / colors)) % 360) + ",100%,70%)";
  };
  // https://www.npmjs.com/package/react-minimal-pie-chart
  pieChart = (arr) => {
    var dataArray = [];
    // var colorArray = randomColor({
    //   count: arr.length,
    //   luminosity: "light",
    //   hue: "#213458",
    // });
    arr.forEach((arr, index) => {
      arr.splice(-1, 1, this.selectColor(index, 20));
      dataArray.push({
        title: arr[0],
        value: arr[arr.length - 2],
        color: this.selectColor(index, 20),
      });
    });

    return (
      <div className="pieChart">
        <div className="pieChartContent">
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
                    backgroundColor: arr[arr.length - 1],
                  }}
                ></div>
                {arr[0]}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
  barChart = (arr, display, sortBy) => {
    var tickers = [];
    var values = [];
    if (sortBy === "numerically") {
      arr.sort((a, b) => b[1] - a[1]);
    } else {
      arr.sort();
    }

    arr.forEach((arr) => {
      tickers.push(arr[0]);
      values.push(arr[display === "percentage" ? arr.length - 2 : 1]);
    });
    values.push(0);
    var state = {
      labels: tickers,
      datasets: [
        {
          label: display === "percentage" ? "Percentage" : "Value",
          backgroundColor: "#1F77AC",
          borderColor: "#213458",
          borderWidth: 3,
          data: values,
        },
      ],
    };
    return (
      <Bar
        className="bar"
        height={350}
        data={state}
        options={{
          title: {
            display: true,
            text:
              display === "percentage"
                ? "Percentage of Portfolio"
                : "Asset Values",
          },
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        }}
      />
    );
  };

  table = (arr, type, sortBy) => {
    var totalValue = 0;
    if (sortBy === "numerically") {
      arr.sort((a, b) => b[1] - a[1]);
    } else {
      arr.sort();
    }
    arr.forEach((arr) => {
      totalValue += arr[1];
    });
    return (
      <div className="table">
        <table>
          <tbody>
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
          </tbody>
        </table>
        <h3>Total Value = {totalValue}</h3>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.table(this.props.dataArray, this.props.type, this.state.sortBy)}
        {this.pieChart(this.props.dataArray)}
        <div className="barChart">
          {this.barChart(
            this.props.dataArray,
            this.state.display,
            this.state.sortBy
          )}
        </div>
        <div className="view">
          <button onClick={this.changeDisplay}>
            {this.state.display === "percentage"
              ? "View Value"
              : "View Percentages"}
          </button>
          <button onClick={this.changeSort}>
            {this.state.sortBy === "alphabetically"
              ? "Sort Numerically"
              : "Sort Alphabetically"}
          </button>
        </div>
      </>
    );
  }
}
export default Charts;
