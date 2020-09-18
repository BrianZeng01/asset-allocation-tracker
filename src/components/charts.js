import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";
import { Bar } from "react-chartjs-2";
import React, { Component } from "react";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { display: "percentage" };
  }

  changeDisplay = () => {
    this.state.display === "percentage"
      ? this.setState({ display: "value" })
      : this.setState({ display: "percentage" });
    console.log(this.state.display);
  };
  // https://www.npmjs.com/package/react-minimal-pie-chart
  pieChart = (arr) => {
    var dataArray = [];
    var colorArray = randomColor({
      count: arr.length,
      luminosity: "light",
      hue: "#213458",
    });
    arr.forEach((arr, index) => {
      arr.splice(-1, 1, colorArray[index]);
      dataArray.push({
        title: arr[0],
        value: arr[arr.length - 2],
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
                  backgroundColor: arr[arr.length - 1],
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
  barChart = (arr, display) => {
    var tickers = [];
    var values = [];
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
      <div className="barChart">
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
        {this.table(this.props.dataArray, this.props.type)}
        {this.pieChart(this.props.dataArray)}
        {this.barChart(this.props.dataArray, this.state.display)}
        <button onClick={this.changeDisplay}>
          {this.state.display === "percentage"
            ? "View Value"
            : "View Percentages"}
        </button>
      </>
    );
  }
}
export default Charts;
