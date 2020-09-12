import React, { Component } from "react";

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
      this.state.reallocate = true;
      localStorage.setItem("reallocate", true);
    }
  }

  addAsset = async () => {
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

  toggleReallocation = () => {
    if (this.state.reallocate) {
      var inputs = document.getElementsByClassName("toggle");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "none";
        inputs[i].required = false;
      }
    } else {
      var inputs = document.getElementsByClassName("toggle");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "inline";
        inputs[i].required = true;
      }
    }
  };

  array = (n) => {
    var arr = [];
    for (var i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  render() {
    return (
      <>
        <div className="assets">
          <button onClick={this.addAsset}>Add Asset</button>
          <button onClick={this.removeAsset}>Remove Last Asset</button>
          <button
            onClick={() => {
              this.setState({ reallocate: !this.state.reallocate });
              localStorage.setItem("reallocate", !this.state.reallocate);
              this.toggleReallocation();
            }}
          >
            {this.state.reallocate
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
            {this.array(this.state.counter).map((count, index) => (
              <div key={index} id={"asset" + count}>
                {count}:<label htmlFor={"ticker" + count}>Ticker</label>
                <input id={"ticker" + count} type="text" required></input>
                <label htmlFor={"shares" + count}>Shares</label>
                <input id={"shares" + count} type="text" required></input>
                <label className="toggle" htmlFor={"min" + count}>
                  Min Target
                </label>
                <input
                  className="toggle"
                  id={"min" + count}
                  type="text"
                  required
                ></input>
                <label className="toggle" htmlFor={"max" + count} required>
                  Max Target
                </label>
                <input
                  className="toggle"
                  id={"max" + count}
                  type="text"
                  required
                ></input>
              </div>
            ))}
            <button type="submit">Calculate</button>
          </form>
          {this.state.counter}
        </div>
      </>
    );
  }
}

export default Asset;
