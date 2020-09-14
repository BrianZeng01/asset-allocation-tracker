import React, { Component } from "react";

class Calculations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    this.setState({ totalValue: totalValue });
    console.log(currentAssets);
  };

  calculateNew = () => {
    var inputs = this.props.data;
    var newTotalValue = 0;
    var cash = 0;
    var recalculatedAssets = [];

    inputs.forEach((arr) => {
      var ticker = arr[0];
      var newShares = Math.floor(
        ((arr[3] / 100) * this.state.totalValue) / arr[2]
      );
      var buySell = newShares - arr[1];
      var newValue = newShares * arr[2];

      newTotalValue += newValue;
      recalculatedAssets.push([ticker, newShares, newValue, buySell]);
    });
    recalculatedAssets.forEach((arr) => {
      arr.push(
        Math.round(
          ((arr[2] / this.state.totalValue) * 100 + Number.EPSILON) * 100
        ) / 100
      );
    });

    this.setState({ cash: this.state.totalValue - newTotalValue });
    console.log(recalculatedAssets, cash);
  };
  render() {
    return (
      <>
        <div className="calculations">
          <div className="calculations">Calculations go here</div>
          {this.props.data.map((arr, index) => (
            <div key={index}>{arr}</div>
          ))}
        </div>
      </>
    );
  }
}

export default Calculations;
