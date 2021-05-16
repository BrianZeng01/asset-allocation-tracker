import React, { useState } from "react";
import Charts from "./ChartsFn.js"

const Calculations = () => {
  return (
      <div className="calculations">
        <div className="currentAssets">
          <h1>Current Allocation</h1>
          {/* <Charts dataArray={this.state.currentAssets} type="current" /> */}
        </div>
        <div id="reallocatedAssets" className="reallocatedAssets">
          <h1>New Allocation</h1>
          {/* <Charts dataArray={this.state.reallocatedAssets} type="reallocated" /> */}
        </div>
      </div>
  );
};

export default Calculations;
