import React, { Component } from "react";

class Calculations extends Component {
  async componentDidMount() {
    console.log("mounting");
    for (var i = 0; i < this.props.data.length; i++) {
      var inputs = this.props.data[i];
      document.getElementById("ticker" + (i + 1)).value = inputs[0];
      document.getElementById("shares" + (i + 1)).value = inputs[1];
      document.getElementById("price" + (i + 1)).value = inputs[2];
      if (inputs.length > 3) {
        document.getElementById("min" + (i + 1)).value = inputs[3];
        document.getElementById("max" + (i + 1)).value = inputs[4];
      }
    }
  }
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
