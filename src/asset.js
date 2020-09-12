import React, { Component } from "react";
import Inputs from "./inputs.js";

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
            onSubmit={() => {
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
        {console.log("render")}
      </>
    );
  }
}

export default Asset;
