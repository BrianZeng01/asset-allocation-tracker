import React, { Component } from "react";
import Inputs from "./inputs.js";
import Calculations from "./calculations.js";

class Asset extends Component {
  constructor() {
    super();
    this.state = {};
    // if (localStorage.getItem("counter")) {
    //   this.state.counter = parseInt(localStorage.getItem("counter"));
    // } else {
    //   this.state.counter = 1;
    //   localStorage.setItem("counter", 1);
    // }
    // if (localStorage.getItem("reallocate")) {
    //   this.state.reallocate = localStorage.getItem("reallocate");
    // } else {
    //   this.state.reallocate = "true";
    //   localStorage.setItem("reallocate", "true");
    // }
    // if (localStorage.getItem("calculations")) {
    //   this.state.calculations = JSON.parse(
    //     localStorage.getItem("calculations")
    //   );
    // } else {
    //   this.state.calculations = [];
    // }
    //  Test 1
    // ---------------------------
    this.state.counter = 3;
    this.state.reallocate = "true";
    this.state.calculations = [
      ["APPL", 30, 150, 20],
      ["AMD", 100, 75, 20],
      ["VFV", 130, 70, 60],
    ];
    // ----------------------------
    // Expected Outcome = [AMD, 4200, 56shares, sell44, 19.91% ],
    //                    [APPL, 4200,28shares,sell2,19.91%],
    //                    [VFV, 12600, 180shares, buy50, 59.7%],
    //                    [CASH, 100]
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addAsset = () => {
    localStorage.setItem(
      "counter",
      parseInt(localStorage.getItem("counter")) + 1
    );
    this.setState({ counter: parseInt(localStorage.getItem("counter")) });
  };

  removeAsset = () => {
    if (this.state.counter > 1) {
      localStorage.setItem(
        "counter",
        parseInt(localStorage.getItem("counter")) - 1
      );
      this.setState({ counter: localStorage.getItem("counter") });
    }
  };

  calculate = () => {
    var assets = document.getElementsByClassName("assetInputs");
    var calcs = [];
    var targetPercentageTotal = 0;
    for (var i = 0; i < assets.length; i++) {
      var loops;
      var arr = [];
      var elem = assets[i].getElementsByTagName("input");
      if (this.state.reallocate === "true") {
        loops = 4;
        targetPercentageTotal += parseInt(elem[3].value);
      } else {
        loops = 3;
      }
      if (targetPercentageTotal > 100) {
        document.getElementById("error").innerHTML =
          "Sum of Target Percentages must not exceed 100%";
        return false;
      }
      for (var j = 0; j < loops; j++) {
        arr.push(elem[j].value);
      }
      calcs.push(arr);
    }
    calcs.sort();
    this.setState({ calculations: calcs });
    localStorage.setItem("calculations", JSON.stringify(calcs));
    console.log("submitted");
  };

  render() {
    return (
      <>
        <div className="assets">
          <button onClick={this.addAsset}>Add Asset</button>
          <button onClick={this.removeAsset}>Remove Last Asset</button>
          <button
            onClick={() => {
              localStorage.setItem(
                "reallocate",
                localStorage.getItem("reallocate") === "true" ? "false" : "true"
              );
              this.setState({ reallocate: localStorage.getItem("reallocate") });
            }}
          >
            {this.state.reallocate === "true"
              ? "Check Current Allocation"
              : "Reallocate Assets"}
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear
          </button>
          <form
            action="#"
            onSubmit={() => {
              this.calculate();
            }}
          >
            <Inputs
              counter={this.state.counter}
              reallocate={this.state.reallocate}
            />

            <button type="submit">Calculate</button>
            <div id="error"></div>
          </form>
          {this.state.counter}
        </div>
        <Calculations
          data={this.state.calculations}
          reallocate={this.state.reallocate}
        />
      </>
    );
  }
}

export default Asset;
