import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div style={{ textAlign: "center", fontWeight: "bold" }}></div>
    </div>
  );
};

export default Loader;
