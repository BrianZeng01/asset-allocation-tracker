import React, { Component } from "react";
import Charts from "./charts.js";

class Calculations extends Component {
  constructor(props) {
    super(props);
    // current [ticker,value,shares,percentage, color]
    // reallocated [ticker, value, shares, buysell, percentage, color]
    this.state = { currentAssets: [], reallocatedAssets: [] };
  }

  componentDidMount() {
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

    this.recalculate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.recalculate();
      console.log("recalculated in didupdate");
      if (prevProps.reallocate !== this.props.reallocate) {
      }
    }
  }
  recalculate = async () => {
    await this.calculateCurrent();
    var elem = document.getElementById("reallocatedAssets");
    if (this.props.reallocate === "true") {
      this.calculateNew();
      if (this.props.data[0].length >= 4) {
        elem.style.display = "grid";
      }
    } else {
      elem.style.display = "none";
    }
  };

  calculateCurrent = () => {
    var inputs = this.props.data;
    var totalValue = 0;
    var currentAssets = [];

    inputs.forEach((arr) => {
      var value = +(arr[1] * arr[2]).toFixed(2);
      currentAssets.push([arr[0], value, arr[1]]);
      totalValue += arr[1] * arr[2];
    });
    currentAssets.forEach((arr) => {
      arr.push(
        Math.round(((arr[1] / totalValue) * 100 + Number.EPSILON) * 100) / 100
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
      var newValue = +(newShares * arr[2]).toFixed(2);

      newTotalValue += newValue;
      reallocatedAssets.push([ticker, newValue, newShares, buySell]);
    });
    var cash =
      Math.round(
        (this.state.totalValue - newTotalValue) * 100 + Number.EPSILON
      ) / 100;
    reallocatedAssets.push(["CASH", cash, 0, 0]);
    reallocatedAssets.forEach((arr) => {
      arr.push(
        Math.round(
          ((arr[1] / this.state.totalValue) * 100 + Number.EPSILON) * 100
        ) / 100
      );
      arr.push("none");
    });

    this.setState({ reallocatedAssets: reallocatedAssets });
  };

  render() {
    return (
      <>
        <div className="calculations">
          <div className="currentAssets">
            <h1>Current Allocation</h1>
            <Charts dataArray={this.state.currentAssets} type="current" />
          </div>
          <div id="reallocatedAssets" className="reallocatedAssets">
            <h1>New Allocation</h1>
            <Charts
              dataArray={this.state.reallocatedAssets}
              type="reallocated"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Calculations;
