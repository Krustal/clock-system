import * as THREE from "three";
import earthTexture from "./images/earth_texture_2.jpg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(20, 10, 20);
scene.add(directionalLight);

const earthGeometry = new THREE.SphereGeometry(5, 50, 50);
const earthMaterial = new THREE.MeshPhongMaterial({
  // map: new THREE.ImageUtils.loadTexture("./images/earth_texture_2.jpg"),
  map: new THREE.TextureLoader().load(earthTexture),
  color: 0xaaaaaa,
  specular: 0x333333,
  shininess: 25
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earth);

const render = actions => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
