import React, { useState } from 'react';

const ButtonBar = ({addAsset, testValues, clearHandler, reallocateHandler, reallocateMode}) => {

    return (
        <div className="buttons">
            <button onClick={addAsset}>Add Asset</button>
            <button
              onClick={reallocateHandler}
            >
              {reallocateMode === "true"
                ? "Current Allocation Only"
                : "Reallocate Assets"}
            </button>
            <button
              onClick={clearHandler}
            >
              Clear
            </button>
            <button onClick={testValues}>
              Use Test Values
            </button>
        </div>
    );
}

export default ButtonBar;