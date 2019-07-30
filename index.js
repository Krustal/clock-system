import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import earthTexture from "./images/earth_texture_2.jpg";
import cloudTexture from "./images/clouds_2.jpg";
import starTexture from "./images/galaxy_starfield.png";

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
const orbit = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(20, 10, 20);
scene.add(directionalLight);

const earthGeometry = new THREE.SphereGeometry(10, 50, 50);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(earthTexture),
  color: 0xaaaaaa,
  specular: 0x333333,
  shininess: 25
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earth);

// Cloud Geometry and Material
const cloudGeometry = new THREE.SphereGeometry(10.3, 50, 50);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(cloudTexture),
  transparent: true,
  opacity: 0.2
});

const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

// Starfield
const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
const starMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(starTexture),
  side: THREE.DoubleSide,
  shininess: 0
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

const render = actions => {
  // Rotate the earth about the y-axis
  earth.rotation.y += 0.0005;
  clouds.rotation.y -= 0.00025;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
