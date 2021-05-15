import React, { useState } from 'react';

const ButtonBar = ({addAsset, clearHandler, reallocateHandler, reallocateMode}) => {

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
        </div>
    );
}

export default ButtonBar;