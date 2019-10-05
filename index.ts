import * as THREE from "three";
import System from "./src/System";
import OrbitalBody from "./src/OrbitalBody";

// System Code
const system = new System({ au: 35 }, true);

const timeScale = 0.6; // period of 1 takes ## seconds
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
    name: "yearRise",
    size: 3.5,
    semiMajorAxis: 5,
    period: 10000
  },
  {
    name: "yearFall",
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

moons.forEach(moonProps => {
  const moon = new OrbitalBody({
    ...moonProps,
    period: moonProps.period * timeScale,
    system
  });
  system.addBody(moon);
});

system.start();
