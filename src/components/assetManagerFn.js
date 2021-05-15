import React, { useState } from 'react';
import ButtonBar from './ButtonBarFn.js';
import Inputs from './InputsFn.js';
import Calculations from './CalculationsFn.js';


const AssetManagerFn = () => {
    const [reallocateMode, setReallocateMode] = useState(
        localStorage.getItem("reallocateMode") || true
    );

    const [inputs, setInputs] = useState(
        localStorage.getItem("inputs") || []
    );
    // Each item in the inputs array will be an array itself containing
    // [id, ticker, shares, price, target percentage]


    const reallocateHandler = () => {
        console.log("reallocateHandled");
    }

    const clearHandler = () => {
        console.log("clearHandled");
    }
    
    const addAsset = () => {
        console.log("added asset");
    }

    return (
        <div className="assets">
            <h1>Portfolio Allocation Tool</h1>
            <ButtonBar addAsset={addAsset} clearHandler={clearHandler} 
             reallocateHandler={reallocateHandler} reallocateMode={reallocateMode}/>
            <Inputs reallocateMode={reallocateMode}/>
            <Calculations />
        </div>
    )
}

export default AssetManagerFn;