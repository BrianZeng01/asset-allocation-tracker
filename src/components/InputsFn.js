import React, { useState } from "react";

const Inputs = ({ changeHandler, deleteInput, inputs, reallocateMode }) => {
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
        <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Price</th>
              {reallocateMode === "true" ? <th>Target Percentage</th> : null}
            </tr>
            {inputs.map((input) => (
              <tr className={`asset${input.id}`} key={input.id}>
                <td>
                  <input
                    id={"ticker" + input.id}
                    type="text"
                    required
                    placeholder="APPL"
                    value={input.ticker}
                    onChange={changeHandler}
                  ></input>
                </td>
                <td>
                  <input
                    id={"shares" + input.id}
                    type="number"
                    required
                    placeholder="30"
                    value={input.shares}
                    onChange={changeHandler}
                  ></input>
                </td>
                <td>
                  <input
                    id={"price" + input.id}
                    type="text"
                    required
                    placeholder="150"
                    value={input.price}
                    onChange={changeHandler}
                  ></input>
                </td>
                <td>
                  <input
                    className="toggle"
                    id={"target" + input.id}
                    type="number"
                    required
                    placeholder="10"
                    value={input.targetPercentage}
                    onChange={changeHandler}
                  ></input>
                </td>
                <td>
                  <button onClick={() => deleteInput(input.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Inputs;
