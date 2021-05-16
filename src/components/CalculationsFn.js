import React, { useState } from "react";
import Charts from "./ChartsFn.js";

const Calculations = ({ inputs, reallocationMode }) => {
  const [currentAssets, setCurrentAssets] = useState(
    JSON.parse(localStorage.getItem("currentAssets")) || []
  );

  const [reallocatedAssets, setReallocatedAssets] = useState(
    JSON.parse(localStorage.getItem("reallocatedAssets")) || []
  );

  const [totalValue, setTotalValue] = useState(
   parseInt(localStorage.getItem("totalValue")) || 0
  );

  React.useEffect(() => {
    recalculate();
  }, [inputs]);

  const recalculate = () => {
    calculateCurrent();
    let elem = document.querySelector("#reallocatedAssets");
    if (reallocationMode === "true") {
      calculateNew();
      elem.style.display = "grid";
    } else {
      elem.style.display = "none";
    }
  };

  const calculateCurrent = () => {
    let total = 0;
    let temp = [];

    inputs.forEach((input) => {
      let value = parseInt((input.shares * input.price).toFixed(2));
      temp.push({ticker:input.ticker, value:value, shares:input.shares});
      total += value; 
    });
    temp.forEach((asset) => {
      asset["percentage"] =  Math.round(
        ((asset.value / total) * 100 + Number.EPSILON) * 100) / 100
    });

    setCurrentAssets(temp);
    setTotalValue(total);
  };

  const calculateNew = () => {
    let inputs = this.props.data;
    let newTotalValue = 0;
    let reallocatedAssets = [];

    inputs.forEach((arr) => {
      let ticker = arr[0];
      let newShares = Math.floor(
        ((arr[3] / 100) * this.state.totalValue) / arr[2]
      );
      let buySell = newShares - arr[1];
      let newValue = +(newShares * arr[2]).toFixed(2);

      newTotalValue += newValue;
      reallocatedAssets.push([ticker, newValue, newShares, buySell]);
    });
    let cash =
      Math.round(
        (this.state.totalValue - newTotalValue) * 100 + Number.EPSILON
      ) / 100;
    reallocatedAssets.push(["CASH", cash, 0, 0]);
    reallocatedAssets.forEach((arr) => {
      arr.push(
        Math.round(
          ((arr[1] / this.state.totalValue) * 100 + Number.EPSILON) * 100
        ) / 100
      );
      arr.push("none");
    });

    this.setState({ reallocatedAssets: reallocatedAssets });
  };

  return (
    <div className="calculations">
      <div className="currentAssets">
        <h1>Current Allocation</h1>
        <Charts assets={currentAssets} type="current" />
      </div>
      <div id="reallocatedAssets" className="reallocatedAssets">
        <h1>New Allocation</h1>
        <Charts assets={reallocatedAssets} type="reallocated" />
      </div>
    </div>
  );
};

export default Calculations;
