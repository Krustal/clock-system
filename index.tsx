import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";

// Moons
const moons = [
  {
    name: "planet",
    size: 10,
    semiMajorAxis: 0,
    period: 0
  },
  {
    name: "evens",
    size: 3.5,
    semiMajorAxis: 1,
    period: 1
  },
  {
    name: "odds",
    size: 3.5,
    trueAnamoly: 180,
    semiMajorAxis: 1,
    period: 1
  },
  {
    name: "dawn",
    size: 3.5,
    semiMajorAxis: 2,
    period: 10
  },
  {
    name: "dusk",
    size: 3.5,
    trueAnamoly: 180,
    semiMajorAxis: 2,
    period: 10
  },
  {
    name: "week",
    size: 3.5,
    semiMajorAxis: 3,
    period: 100
  },
  {
    name: "evenMonths",
    size: 3.5,
    semiMajorAxis: 4,
    period: 1000
  },
  {
    name: "oddMonths",
    size: 3.5,
    trueAnamoly: 180,
    semiMajorAxis: 4,
    period: 1000
  },
  {
    name: "oddYear",
    size: 3.5,
    semiMajorAxis: 5,
    period: 10000
  },
  {
    name: "evenYear",
    size: 3.5,
    trueAnamoly: 180,
    semiMajorAxis: 5,
    period: 10000
  },
  {
    name: "generation",
    size: 3.5,
    semiMajorAxis: 6,
    period: 100000
  },
  {
    name: "sun",
    size: 6,
    semiMajorAxis: 8,
    inclination: 30,
    pressession: 100, // orbital period
    period: 10,
    lumoscity: 1
  }
];

ReactDOM.render(
  <App baseAu={35} bodies={moons} timeScale={1} debug />,
  document.getElementById("app")
);
