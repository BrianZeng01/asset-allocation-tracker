import React, { useState } from "react";
import ButtonBar from "./ButtonBarFn.js";
import Inputs from "./InputsFn.js";
import Calculations from "./CalculationsFn.js";

const AssetManagerFn = () => {
  const [reallocateMode, setReallocateMode] = useState(
    localStorage.getItem("reallocateMode") || "true"
  );

  const [inputs, setInputs] = useState(
    JSON.parse(localStorage.getItem("inputs")) || []
  );
  // Each item in the inputs array will be an map containing
  // {id, ticker, shares, price, target percentage}

  // Anytime something changes we save everything to local storage
  // All the localstorage setting done here
  React.useEffect(() => {
    localStorage.setItem("reallocateMode", reallocateMode);
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs, reallocateMode]);

  const reallocateHandler = () => {
    setReallocateMode(reallocateMode === "true" ? "false" : "true");
    console.log("reallocate Handled");
  };

  const clearHandler = () => {
    setInputs([]);
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

  const inputChangeHandler = () => {};

  return (
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
        changeHandler={inputChangeHandler}
        deleteInput={deleteInput}
        inputs={inputs}
        reallocateMode={reallocateMode}
      />
      <Calculations />
    </div>
  );
};

export default AssetManagerFn;
