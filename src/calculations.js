import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";

class Calculations extends Component {
  constructor(props) {
    super(props);
    // current [ticker,value,shares,percentage]
    // reallocated [ticker, value, shares, buysell, percentage]
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
    reallocatedAssets.forEach((arr) => {
      arr.push(
        Math.round(
          ((arr[1] / this.state.totalValue) * 100 + Number.EPSILON) * 100
        ) / 100
      );
    });

    this.setState({ cash: this.state.totalValue - newTotalValue });
    this.setState({ reallocatedAssets: reallocatedAssets });
    console.log(reallocatedAssets, cash);
  };

  pieChart = (arr) => {
    return (
      <PieChart
        data={[
          arr.forEach((arr) => {
            '{title: "amd", value: 33, color: "blue" }';
          }),
          // var randomColor = Math.floor(Math.random()*16777215).toString(16);
        ]}
      />
    );
  };

  table = (arr, type) => {
    return (
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
    );
  };
  render() {
    return (
      <>
        <div className="calculations">
          <div className="currentAssets">
            <div className="table">
              {this.table(this.state.currentAssets, "current")}
            </div>

            <div className="pieChart">
              {this.pieChart(this.state.currentAssets)}
            </div>
          </div>
          <div className="reallocatedAssets">
            <div className="table">
              {this.table(this.state.reallocatedAssets, "reallocated")}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Calculations;
