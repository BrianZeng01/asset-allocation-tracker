import React, { Component } from "react";
import Inputs from "./inputs.js";
import Calculations from "./calculations.js";
import currentAllocationDemo from "../../images/currentAllocationDemo.png";
import newAllocationDemo from "../../images/newAllocationDemo.png";

class AssetManager extends Component {
  constructor() {
    super();
    this.state = {};
    if (localStorage.getItem("counter")) {
      this.state.counter = parseInt(localStorage.getItem("counter"));
    } else {
      this.state.counter = 1;
      localStorage.setItem("counter", 1);
    }
    if (localStorage.getItem("reallocate")) {
      this.state.reallocate = localStorage.getItem("reallocate");
    } else {
      this.state.reallocate = "true";
      localStorage.setItem("reallocate", "true");
    }
    if (localStorage.getItem("calculations")) {
      this.state.calculations = JSON.parse(
        localStorage.getItem("calculations")
      );
    } else {
      this.state.calculations = [];
    }
    //  Test 1
    // // ---------------------------
    // this.state.counter = 3;
    // this.state.reallocate = "true";
    // this.state.calculations = [
    //   ["APPL", 30, 150, 20],
    //   ["AMD", 100, 75, 20],
    //   ["VFV", 130, 70, 60],
    // ];
    // ----------------------------
    // Expected Outcome = [AMD, 4200, 56shares, sell44, 19.91% ],
    //                    [APPL, 4200,28shares,sell2,19.91%],
    //                    [VFV, 12600, 180shares, buy50, 59.7%],
    //                    [CASH, 100]
    // Test 2
    // this.state.counter = 9;
    // this.state.reallocate = "true";
    // this.state.calculations = [
    //   ["APPL", 30, 150, 10],
    //   ["AMD", 100, 75, 10],
    //   ["VFV", 130, 70, 30],
    //   ["GOOG", 10, 400, 5],
    //   ["FB", 20, 250, 10],
    //   ["BTC", 40, 250, 5],
    //   ["VGRO", 130, 20, 15],
    //   ["TD", 40, 80, 10],
    //   ["BYND", 30, 200, 5],
    // ];
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

  collectInputs = () => {
    var assets = document.getElementsByClassName("input");
    var calcs = [];
    var targetPercentageTotal = 0;
    for (var i = 0; i < assets.length; i++) {
      var loops;
      var arr = [];
      var elem = assets[i].getElementsByTagName("input");
      if (this.state.reallocate === "true") {
        loops = 4;
        targetPercentageTotal += parseFloat(elem[3].value).toFixed(2);
      } else {
        loops = 3;
      }
      if (targetPercentageTotal > 100) {
        document.getElementById("error").innerHTML =
          "Sum of Target Percentages must not exceed 100%";
        return false;
      }
      for (var j = 0; j < loops; j++) {
        var item = elem[j].value;
        if (typeof item === "number") {
          arr.push(Math.round(((item * 100 + Number.EPSILON) * 100) / 100));
        } else {
          arr.push(item);
        }
      }
      calcs.push(arr);
    }

    calcs.sort();
    this.setState({ calculations: calcs });
    localStorage.setItem("calculations", JSON.stringify(calcs));
    console.log(calcs);
    console.log("submitted");
  };

  render() {
    return (
      <>
        <div className="assets">
            <h1>Portfolio Allocation Tool</h1>
          <div className="buttons">
            <button onClick={this.addAsset}>Add Asset</button>
            <button onClick={this.removeAsset}>Remove Last Asset</button>
            <button
              onClick={() => {
                localStorage.setItem(
                  "reallocate",
                  localStorage.getItem("reallocate") === "true"
                    ? "false"
                    : "true"
                );
                this.setState({
                  reallocate: localStorage.getItem("reallocate"),
                });
              }}
            >
              {this.state.reallocate === "true"
                ? "Current Allocation Only"
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
          </div>
          <form
            action="#"
            onSubmit={() => {
              this.collectInputs();
            }}
          >
            <Inputs
              counter={this.state.counter}
              reallocate={this.state.reallocate}
            />
            <h4>
              Note: Sum of Target Percentage under 100 will allocate remaining
              percentage to cash
            </h4>
            <button type="submit" className="calculate">
              Calculate
            </button>
            <div id="error"></div>
          </form>
        </div>
        {this.state.calculations.length >= 1 ? (
          <Calculations
            data={this.state.calculations}
            reallocate={this.state.reallocate}
          />
        ) : (
          <div className="demoImages">
            <h2>Demo View</h2>
            <div>
              <img alt="demoImage" src={currentAllocationDemo}></img>
              <img alt="demoImage" src={newAllocationDemo}></img>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AssetManager;
