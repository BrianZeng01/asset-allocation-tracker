import React, { useState } from "react";

const Inputs = ({ collectInputs, deleteInput, inputs, reallocateMode }) => {
  React.useEffect(() => {
    toggleReallocate();
  }, [reallocateMode, inputs]);

  const toggleReallocate = () => {
    let assets = document.querySelectorAll(".toggle");
    if (reallocateMode === "true") {
      for (var j = 0; j < inputs.length; j++) {
        assets[j].style.display = "inline";
        assets[j].required = true;
      }
    } else {
      for (var i = 0; i < inputs.length; i++) {
        assets[i].style.display = "none";
        assets[i].required = false;
      }
    }
  };
  return (
    <div className="inputs">
      {inputs.length > 0 ? (
        <form action="#" onSubmit={collectInputs}>
          <table>
            <tbody>
              <tr>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Price</th>
                {reallocateMode === "true" ? <th>Target Percentage</th> : null}
              </tr>
              {inputs.map((input) => (
                <tr className={`asset${input.id} input`} key={input.id}>
                  <td>
                    <input
                      id={"ticker" + input.id}
                      type="text"
                      required
                      placeholder="APPL"
                      defaultValue={input.ticker}
                    ></input>
                  </td>
                  <td>
                    <input
                      id={"shares" + input.id}
                      type="number"
                      required
                      placeholder="30"
                      defaultValue={input.shares}
                    ></input>
                  </td>
                  <td>
                    <input
                      id={"price" + input.id}
                      type="text"
                      required
                      placeholder="150"
                      defaultValue={input.price}
                    ></input>
                  </td>
                  <td>
                    <input
                      className="toggle"
                      style={reallocateMode === "true" ? {display:"inline"} : {display:"none"}}
                      id={"target" + input.id}
                      type="number"
                      required
                      placeholder="10"
                      defaultValue={input.targetPercentage}
                    ></input>
                  </td>
                  <td>
                    <button onClick={() => deleteInput(input.id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>
            Note: Sum of Target Percentage under 100 will allocate remaining
            percentage to cash
          </h4>
          <button type="submit" className="calculate">
            Calculate
          </button>
          <div id="error"></div>
        </form>
      ) : null}
    </div>
  );
};

export default Inputs;
