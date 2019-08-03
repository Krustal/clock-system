import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  SphereGeometry,
  MeshPhongMaterial,
  TextureLoader,
  Mesh,
  DoubleSide
} from "three";
import OrbitControls from "three-orbitcontrols";
import starTexture from "../images/galaxy_starfield.png";
import OrbitalBody from "./OrbitalBody";

export default class System {
  constructor(config) {
    this.config = config;
    const scene = new Scene();

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 280, 560);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    new OrbitControls(camera, renderer.domElement);

    const ambientLight = new AmbientLight(0x888888);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xfdfcf0, 1);
    directionalLight.position.set(20, 10, 20);
    scene.add(directionalLight);

    // StarField
    const starGeometry = new SphereGeometry(1000, 50, 50);
    const starMaterial = new MeshPhongMaterial({
      map: new TextureLoader().load(starTexture),
      side: DoubleSide,
      shininess: 0
    });
    const starField = new Mesh(starGeometry, starMaterial);
    scene.add(starField);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  addBody(bodyConfig) {
    const moonBody = new OrbitalBody(bodyConfig, this.config);
    this.scene.add(moonBody.mesh);
    this.scene.add(moonBody.orbit);
  }

  start() {
    const render = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(render);
      return Promise.resolve("Dummy response to avoid noisy console");
    };
    render();
  }
}
