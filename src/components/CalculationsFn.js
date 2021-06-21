import React, { useState } from "react";
import Charts from "./ChartsFn.js";

const Calculations = ({ inputs, reallocateMode }) => {
  const [currentAssets, setCurrentAssets] = useState([]);
  const [reallocatedAssets, setReallocatedAssets] = useState([]);

  const [totalValue, setTotalValue] = useState(0);

  React.useEffect(() => {
    recalculate();
  }, [inputs, totalValue]);

  const recalculate = () => {
    calculateCurrent();
    let elem = document.querySelector("#reallocatedAssets");
    if (reallocateMode === "true") {
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
      let value = parseFloat((input.shares * input.price).toFixed(2));
      temp.push({ ticker: input.ticker, value: value, shares: input.shares , price: input.price});
      total += value;
    });
    temp.forEach((asset) => {
      asset["percentage"] =
        Math.round(((asset.value / total) * 100 + Number.EPSILON) * 100) / 100;
    });

    setCurrentAssets(temp);
    setTotalValue(total);
    console.log("current allocation calculated");
  };

  const calculateNew = () => {
    let newTotalValue = 0;
    let reallocatedAssets = [];
    let cashInCurrent = false;
    let cashObj;

    inputs.forEach((input) => {
      let newShares = Math.floor(
        ((input.targetPercentage / 100) * totalValue) / input.price
      );
      let buySell = newShares - input.shares;
      let newValue = parseFloat((newShares * input.price).toFixed(2));
      let percentage =
        Math.round(((newValue / totalValue) * 100 + Number.EPSILON) * 100) /
        100;

      newTotalValue += newValue;
      let obj = {
        ticker: input.ticker,
        value: newValue,
        shares: newShares,
        price: input.price,
        percentage: percentage,
        change: buySell,
      };
      reallocatedAssets.push(obj);
      if(input.ticker.toLowerCase() == "cash") {
        cashInCurrent = true;
        obj.change = 0;
        cashObj = obj;
      }
    });
    let cash =
      Math.round((totalValue - newTotalValue) * 100 + Number.EPSILON) / 100;
    let percentage = 
        Math.round(((cash / totalValue) * 100 + Number.EPSILON) * 100) /
        100;
    if(cashInCurrent) {
      cashObj.value = cashObj.value + cash;
      cashObj.shares = cashObj.shares + cash;
      cashObj.percentage = cashObj.percentage + percentage;
    } else {
      reallocatedAssets.push({
        ticker: "CASH",
        value: cash,
        shares: cash,
        price: 1,
        percentage,
        change: 0,
    });
    }
    

    setReallocatedAssets(reallocatedAssets); 
    console.log("new allocation calculated");
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
