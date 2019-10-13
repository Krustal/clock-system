import {
  Scene,
  AmbientLight,
  DirectionalLight,
  SphereGeometry,
  MeshPhongMaterial,
  TextureLoader,
  Mesh,
  DoubleSide,
  AxesHelper
} from "three";
import starTexture from "../images/galaxy_starfield.png";
import OrbitalBody from "./OrbitalBody";

export default class System {
  readonly scene: Scene = new Scene();
  readonly epoch: number = new Date().valueOf();
  readonly bodies: OrbitalBody[] = [];
  ticks: number = 0;
  constructor(public config: { au: number }, public debug: boolean = false) {
    const ambientLight = new AmbientLight(0x888888);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xfdfcf0, 1);
    directionalLight.position.set(20, 10, 20);
    this.scene.add(directionalLight);

    // StarField
    const starGeometry = new SphereGeometry(1000, 50, 50);
    const starMaterial = new MeshPhongMaterial({
      map: new TextureLoader().load(starTexture),
      side: DoubleSide,
      shininess: 0
    });
    const starField = new Mesh(starGeometry, starMaterial);
    this.scene.add(starField);

    // DEBUG
    if (debug) {
      var axesHelper = new AxesHelper(50);
      this.scene.add(axesHelper);
    }
  }

  addBody(moonBody) {
    this.bodies.push(moonBody);
    this.scene.add(moonBody.overall);
  }

  moveToTick(tick: number) {
    this.ticks = tick;
    this.bodies.forEach(body => body.update());
  }

  get au() {
    return this.config.au;
  }
}
