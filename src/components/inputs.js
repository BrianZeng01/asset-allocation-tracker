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

  deleteInput = (id) => {
    document.querySelector(`input${id}`);
  }

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
          <table>
            <tbody>
              <tr>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Price</th>
                {this.props.reallocate === "true" ? (
                  <th>Target Percentage</th>
                ) : null}
              </tr>
              {this.array(this.props.counter).map((count, index) => (
                <tr className={`input${index}`}  key={index}>
                  <td>
                    <input
                      id={"ticker" + count}
                      type="text"
                      required
                      placeholder="APPL"
                    ></input>
                  </td>
                  <td>
                    <input
                      id={"shares" + count}
                      type="number"
                      required
                      placeholder="30"
                    ></input>
                  </td>
                  <td>
                    <input
                      id={"price" + count}
                      type="text"
                      required
                      placeholder="150"
                    ></input>
                  </td>
                  <td>
                    <input
                      className="toggle"
                      id={"target" + count}
                      type="number"
                      required
                      placeholder="10"
                    ></input>
                  </td>
                  <td>
                    <button onClick={this.deleteInput(index)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Inputs;
