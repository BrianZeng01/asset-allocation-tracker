import React from "react";
import Asset from "./asset.js";
import "./style.css";

function App() {
  return (
    <>
      <div className="header">
        <h1>Asset Reallocator</h1>
      </div>
      <div>
        <Asset />
      </div>
    </>
  );
}

export default App;
