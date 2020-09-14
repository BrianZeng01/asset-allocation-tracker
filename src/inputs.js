import React, { Component } from "react";

class Inputs extends Component {
  constructor(props) {
    super(props);
  }

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
        {this.array(this.props.counter).map((count, index) => (
          <div key={index} id={"asset" + count} className="assetInputs">
            {count}:<label htmlFor={"ticker" + count}>Ticker</label>
            <input id={"ticker" + count} type="text" required></input>
            <label htmlFor={"shares" + count}>Shares</label>
            <input id={"shares" + count} type="number" required></input>
            <label htmlFor={"price" + count}>Price</label>
            <input id={"price" + count} type="text" required></input>
            <label className="toggle" htmlFor={"min" + count}>
              Min Target
            </label>
            <input
              className="toggle"
              id={"min" + count}
              type="number"
              required
            ></input>
            <label className="toggle" htmlFor={"max" + count} required>
              Max Target
            </label>
            <input
              className="toggle"
              id={"max" + count}
              type="number"
              required
            ></input>
          </div>
        ))}
      </>
    );
  }
}

export default Inputs;
