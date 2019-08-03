import * as THREE from "three";
import System from "./src/System";

// System Code
const system = new System({ au: 35 });

// Moons
const moons = [
  { name: "planet", size: 10, plot: 0, semiMajorAxis: 0 },
  { name: "evens", size: 3.5, plot: 0, semiMajorAxis: 1 },
  { name: "odds", size: 3.5, plot: 180, semiMajorAxis: 1 },
  { name: "dawn", size: 3.5, plot: 0, semiMajorAxis: 2 },
  { name: "dusk", size: 3.5, plot: 180, semiMajorAxis: 2 },
  { name: "week", size: 3.5, plot: 0, semiMajorAxis: 3 },
  { name: "evenMonths", size: 3.5, plot: 0, semiMajorAxis: 4 },
  { name: "oddMonths", size: 3.5, plot: 180, semiMajorAxis: 4 },
  { name: "yearRise", size: 3.5, plot: 0, semiMajorAxis: 5 },
  { name: "yearFall", size: 3.5, plot: 180, semiMajorAxis: 5 },
  { name: "generation", size: 3.5, plot: 0, semiMajorAxis: 6 }
];

moons.forEach(moon => {
  system.addBody(moon);
});

system.start();
