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
camera.position.set(0, 280, 560);

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

// Moons
const moons = [
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
  const moonBody = new OrbitalBody(moon, system);
  scene.add(moonBody.mesh);
});

// Renderer

const render = actions => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
