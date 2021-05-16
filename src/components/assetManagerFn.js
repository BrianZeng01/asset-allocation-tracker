import React, { useState } from "react";
import ButtonBar from "./ButtonBarFn.js";
import Inputs from "./InputsFn.js";
import Calculations from "./CalculationsFn.js";
import currentAllocationDemo from "../images/currentAllocationDemo.png";
import newAllocationDemo from "../images/newAllocationDemo.png";

const AssetManagerFn = () => {
  const [reallocateMode, setReallocateMode] = useState(
    localStorage.getItem("reallocateMode") || "true"
  );

  const [displayCalculations, setDisplayCalculations] = useState(
    localStorage.getItem("displayCalculations") || "false"
  );

  // Each item in the inputs array will be an map containing
  // {id, ticker, shares, price, target percentage}
  const [inputs, setInputs] = useState(
    JSON.parse(localStorage.getItem("inputs")) || []
  );

  // Each item in the calculations array will be an map containing
  // {ticker, value, shares, change, targetPercentage}
  const [calculations, setCalculations] = useState(
    JSON.parse(localStorage.getItem("calculations")) || []
  );

  // Anytime something changes we save everything to local storage
  // All the localstorage setting done here
  React.useEffect(() => {
    localStorage.setItem("reallocateMode", reallocateMode);
    localStorage.setItem("inputs", JSON.stringify(inputs));
    localStorage.setItem("calculations", JSON.stringify(calculations));
    localStorage.setItem("displayCalculations", displayCalculations);
  }, [inputs, reallocateMode, displayCalculations, calculations]);

  const reallocateHandler = () => {
    setReallocateMode(reallocateMode === "true" ? "false" : "true");
    console.log("reallocate Handled");
  };

  const clearHandler = () => {
    setInputs([]);
    setCalculations([]);
    setDisplayCalculations("false");
    console.log("Assets Cleared");
  };

  const addAsset = () => {
    console.log("added asset");
    let nextId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 0;
    let newAsset = {
      id: nextId,
      ticker: "",
      shares: "",
      price: "",
      targetPercentage: "",
    };
    setInputs([...inputs, newAsset]);
  };

  const testValues = () => {
    setInputs([
      { id: 0, ticker: "AMD", shares: 100, price: 75, targetPercentage: 10 },
      { id: 1, ticker: "APPL", shares: 30, price: 150, targetPercentage: 10 },
      { id: 2, ticker: "VFV", shares: 130, price: 70, targetPercentage: 30 },
      { id: 3, ticker: "GOOG", shares: 10, price: 400, targetPercentage: 5 },
      { id: 4, ticker: "FB", shares: 20, price: 250, targetPercentage: 10 },
      { id: 5, ticker: "BTC", shares: 40, price: 250, targetPercentage: 5 },
      { id: 6, ticker: "VGRO", shares: 130, price: 20, targetPercentage: 15 },
      { id: 7, ticker: "TD", shares: 40, price: 80, targetPercentage: 10 },
      { id: 8, ticker: "BYND", shares: 30, price: 200, targetPercentage: 5 },
    ]);
    console.log("Test values being used");
  };

  const deleteInput = (id) => {
    setInputs(
      inputs.filter((i) => {
        return i.id !== id;
      })
    );
    console.log(`input ${id} deleted`);
  };

  const collectInputs = () => {
    let assets = document.querySelectorAll(".input");
    let temp = [];
    let targetPercentageTotal = 0;
    assets.forEach((asset, index) => {
      let inputList = asset.querySelectorAll("input");
      let id = index;
      let ticker = inputList[0].value;
      let shares = inputList[1].value;
      let price = inputList[2].value;
      let targetPercentage = parseInt(inputList[3].value);
      temp.push({
        id: id,
        ticker: ticker,
        shares: shares,
        price: price,
        targetPercentage: targetPercentage,
      });
      targetPercentageTotal += targetPercentage;
    });
    setInputs(temp);
    if (reallocateMode === "true" && targetPercentageTotal > 100) {
      document.querySelector("#error").innerHTML =
        '<h2 class="errormsg">Sum of Target Percentages must not exceed 100%</h2>';
      setTimeout(() => {
        document.querySelector(".errormsg").remove();
      }, 3000);
      return;
    }
    calculate();
    setDisplayCalculations("true");
    console.log("Inputs saved");
  };

  const calculate = () => {
    setCalculations(inputs);
  };

  return (
    <>
      <div className="assets">
        <h1>Portfolio Allocation Tool</h1>
        <ButtonBar
          addAsset={addAsset}
          testValues={testValues}
          clearHandler={clearHandler}
          reallocateHandler={reallocateHandler}
          reallocateMode={reallocateMode}
        />
        <Inputs
          collectInputs={collectInputs}
          deleteInput={deleteInput}
          inputs={inputs}
          reallocateMode={reallocateMode}
        />
      </div>
      {displayCalculations === "true" ? (
        <Calculations inputs={calculations} reallocateMode={reallocateMode} />
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
};

export default AssetManagerFn;
