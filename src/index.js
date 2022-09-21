import React from "react";
import ReactDOM from "react-dom";


import "./App.css"
import MapWrapper from "./pages/many-markers";

ReactDOM.render(
  <React.StrictMode>
    <div style={{width: '80%'}} >
    <MapWrapper />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
