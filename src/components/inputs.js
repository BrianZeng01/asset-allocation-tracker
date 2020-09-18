import React, { Component } from "react";

class Inputs extends Component {
  array = (n) => {
    var arr = [];
    for (var i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  toggleReallocate = () => {
    var inputs = document.getElementsByClassName("toggle");
    if (this.props.reallocate === "true") {
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].style.display = "inline";
        inputs[j].required = true;
      }
    } else {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "none";
        inputs[i].required = false;
      }
    }
  };

  componentDidMount() {
    this.toggleReallocate();
  }
  componentDidUpdate() {
    this.toggleReallocate();
  }

  render() {
    return (
      <>
        <div className="inputs">
          {this.array(this.props.counter).map((count, index) => (
            <div key={index} id={"asset" + count} className="input">
              {count}:<label htmlFor={"ticker" + count}>Ticker</label>
              <input id={"ticker" + count} type="text" required></input>
              <label htmlFor={"shares" + count}>Shares</label>
              <input id={"shares" + count} type="number" required></input>
              <label htmlFor={"price" + count}>Price</label>
              <input id={"price" + count} type="text" required></input>
              <label className="toggle" htmlFor={"min" + count}>
                Target Percentage
              </label>
              <input
                className="toggle"
                id={"target" + count}
                type="number"
                required
              ></input>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Inputs;
