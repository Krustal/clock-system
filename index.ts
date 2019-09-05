import * as THREE from "three";
import System from "./src/System";
import OrbitalBody from "./src/OrbitalBody";

// System Code
const system = new System({ au: 35 });

const timeScale = 0.6; // period of 1 takes ## seconds
// Moons
const moons = [
  {
    name: "planet",
    size: 10,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 0,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 0
  },
  {
    name: "evens",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 1,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 1
  },
  {
    name: "odds",
    size: 3.5,
    trueAnamoly: 180,
    eccentricity: 0,
    semiMajorAxis: 1,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 1
  },
  {
    name: "dawn",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 2,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 10
  },
  {
    name: "dusk",
    size: 3.5,
    trueAnamoly: 180,
    eccentricity: 0,
    semiMajorAxis: 2,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 10
  },
  {
    name: "week",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 3,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 100
  },
  {
    name: "evenMonths",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 4,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 1000
  },
  {
    name: "oddMonths",
    size: 3.5,
    trueAnamoly: 180,
    eccentricity: 0,
    semiMajorAxis: 4,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 1000
  },
  {
    name: "yearRise",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 5,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 10000
  },
  {
    name: "yearFall",
    size: 3.5,
    trueAnamoly: 180,
    eccentricity: 0,
    semiMajorAxis: 5,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 10000
  },
  {
    name: "generation",
    size: 3.5,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 6,
    inclination: 0,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
    period: 100000
  },
  {
    name: "sun",
    size: 6,
    trueAnamoly: 0,
    eccentricity: 0,
    semiMajorAxis: 8,
    inclination: 30,
    longitudeOfAscNode: 0,
    argOfPeriapsis: 0,
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
