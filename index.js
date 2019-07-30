import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import starTexture from "./images/galaxy_starfield.png";
import OrbitalBody from "./src/OrbitalBody";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
camera.position.set(0, 35, 70);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(20, 10, 20);
scene.add(directionalLight);

// StarField
const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
const starMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(starTexture),
  side: THREE.DoubleSide,
  shininess: 0
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

// System Code

const system = {
  au: 35
};

// Planet
const planet = new OrbitalBody({ size: 10, plot: 0, semiMajorAxis: 0 }, system);
scene.add(planet.mesh);

// Moon
let moonRadius = 35;
let moonTheta = 0;
let moonDeltaTheta = (2 * Math.PI) / 1000;
const moon1 = new OrbitalBody({ size: 3.5, plot: 0, semiMajorAxis: 1 }, system);
// moon1.getMesh().position.set(35, 0, 0);
scene.add(moon1.mesh);

const moon2 = new OrbitalBody(
  { size: 3.5, plot: 180, semiMajorAxis: 1 },
  system
);
// moon2.getMesh().position.set(-35, 0, 0);
scene.add(moon2.mesh);

// Renderer

const render = actions => {
  // Rotate the earth about the y-axis
  // planet.getMesh().rotation.y += 0.0005;
  // Increment moon's theta, and update x & y positon based off new theta value
  // moonTheta += moonDeltaTheta;
  // moon.getMesh().position.x = moonRadius * Math.cos(moonTheta);
  // moon.getMesh().position.z = moonRadius * Math.sin(moonTheta);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
