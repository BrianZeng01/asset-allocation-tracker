import React, { Component } from "react";
import Inputs from "./inputs.js";
import Calculations from "./calculations.js";

class Asset extends Component {
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
    for (var i = 0; i < assets.length; i++) {
      var loops;
      var arr = [];
      var elem = assets[i].getElementsByTagName("input");
      if (this.state.reallocate === "true") {
        loops = 5;
      } else {
        loops = 3;
      }
      for (var j = 0; j < loops; j++) {
        arr.push(elem[j].value);
      }
      calcs.push(arr);
      console.log(arr);
    }
    this.setState({ calculations: calcs });
    localStorage.setItem("calculations", JSON.stringify(calcs));
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
              console.log("submitted");
            }}
          >
            <Inputs
              counter={this.state.counter}
              reallocate={this.state.reallocate}
            />

            <button type="submit">Calculate</button>
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
