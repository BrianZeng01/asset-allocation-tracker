import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Bar } from "react-chartjs-2";

const Charts = ({assets, type}) => {
  const [display, setDisplay] = useState("value");
  const [sortBy, setSortBy] = useState("alphabetically");

  const changeDisplay = () => {
    display === "percentage" ? setDisplay("value") : setDisplay("percentage");
  };

  const changeSort = () => {
    sortBy === "numerically"
      ? setSortBy("alphabetically")
      : setSortBy("numerically");
  };

  const selectColor = (colorNum, colors) => {
    if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
    return "hsl(" + ((120 + colorNum * (360 / colors)) % 360) + ",100%,70%)";
  };

  // https://www.npmjs.com/package/react-minimal-pie-chart
  const pieChart = (assets) => {
    let dataArray = [];
    assets.forEach((asset, index) => {
      dataArray.push({
        title: asset.ticker,
        value: asset.value,
        color: selectColor(index, 20),
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
            {assets.map((asset, index) => (
              <div className="color" key={index}>
                <div
                  className="square"
                  style={{
                    backgroundColor: asset.color
                  }}
                ></div>
                {asset.ticker}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
  const barChart = (assets, display, sortBy) => {
    let tickers = [];
    let values = [];
    if (sortBy === "numerically") {
      assets.sort((a, b) => b.value - a.value);
    } else {
      assets.sort();
    }

    assets.forEach((asset) => {
      tickers.push(asset.ticker);
      values.push(display === "percentage" ? asset.percentage : asset.value);
    });
    values.push(0);
    let state = {
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

  const table = (assets, type, sortBy) => {
    let totalValue = 0;
    if (sortBy === "numerically") {
      assets.sort((a, b) => b.value - a.value);
    } else {
      assets.sort();
    }
    assets.forEach((asset) => {
      totalValue += asset.value;
    });
    return (
      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Value</th>
              <th>Shares</th>
              <th>Percentage</th>
              {type === "reallocated" ? <th>Buy/Sell</th> : null}
            </tr>
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.ticker}</td>
                <td>{asset.value}</td>
                <td>{asset.shares}</td>
                <td>{asset.percentage}</td>
                {type === "reallocated" ? <td>{asset.change}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Value = {totalValue}</h3>
      </div>
    );
  };

  return (
    <>
      {table(assets,type, sortBy)}
      {pieChart(assets)}
      <div className="barChart">
        {barChart(
          assets,
          display,
          sortBy
        )}
      </div>
      <div className="view">
        <button onClick={changeDisplay}>
          {display === "percentage"
            ? "View Value"
            : "View Percentages"}
        </button>
        <button onClick={changeSort}>
          {sortBy === "alphabetically"
            ? "Sort Numerically"
            : "Sort Alphabetically"}
        </button>
      </div>
    </>
  );
};
export default Charts;