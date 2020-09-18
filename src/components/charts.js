import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";
import { Bar } from "react-chartjs-2";
import React, { Component } from "react";

class Charts extends Component {
  // https://www.npmjs.com/package/react-minimal-pie-chart
  pieChart = (arr, type) => {
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
  barChart = (arr, type) => {
    var tickers = [];
    var percentages = [];
    arr.forEach((arr) => {
      tickers.push(arr[0]);
      percentages.push(arr[arr.length - 2]);
    });
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
        {this.table(this.props.dataArray, "current")}
        {this.pieChart(this.props.dataArray, "current")}
        {this.barChart(this.props.dataArray, "current")}
      </>
    );
  }
}
export default Charts;
