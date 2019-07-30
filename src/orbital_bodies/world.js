export default {
  period: 0, // orbital period (year)
  // TODO: in theory I think I can recreate the periapses & apoapsis from the below metrics and the semi-major axis
  // average seperation from center of model and orbital body (symbol: a)
  // semi-major axis: (periapses + apoapsis) / 2
  semiMajorAxis: 0,
  eccentricity: 0, // How far the orbit varies from perfect circle (0) and parabola (1); (symbol: e)
  inclination: 0, // The orbital pitch viewed edge on to system plane (symbol: i)
  direction: "counter-clockwise",
  latOfAscendingNode: 90, // latitude of the ascending node, angle from the vernal equinox to the ascending node (symbol: Ω)
  argOfPeriapsis: 90, // angle from periapsis to ascending node (clockwise), from 0-360 degrees
  plot: 0 // angle in degrees from periapsis to body
};

// System needs: definition of system plane, vernal equinox
