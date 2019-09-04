import {
  SphereGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh,
  Color
} from "three";
import System from "./System";

const RANDOM_COLORS: boolean = true;

function stringToDecimal(input: string): number {
  const val = input
    .split("")
    .map(char => char.charCodeAt(0))
    .reduce((sum, v) => sum + v);
  return val * (1 / 10 ** val.toString().length);
}

// TODO: we are assuming circular orbit ATM (so the semi-major axis is identical
// to peri and apo apsies)
export default class OrbitalBody {
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;
  private orbitMaterial: MeshBasicMaterial;
  private radius: number;
  private orbitGeometry: TorusGeometry;
  private _mesh: Mesh;
  private _orbitMesh: Mesh;
  /**
   *
   * @param size - radius of the orbital body
   * @param trueAnamoly - position of orbiting body along the orbit
   * @param eccentricity - how elongated the orbit is compared to a cirlce
   * @param semiMajorAxis - sum of periapsis and apoapsis divided by 2, TODO
   * @param inclination - vertical tilt of the orbit
   * @param longitudeOfAscNode - horizontally orients the ascending node of the
   * ellipse with respect to the reference point's vernal point.
   * @param argOfPeriapsis - Orientation of the ellipse in the orbital plane, as
   * an angle measured from the ascending node to the periapsis.
   * @param period - The time (in seconds) the body takes to orbit
   * @param system
   */
  constructor(
    public name: string,
    public size: number,
    public trueAnamoly: number,
    public eccentricity: number, // TODO: unsupported
    public semiMajorAxis: number,
    public inclination: number,
    public longitudeOfAscNode: number,
    public argOfPeriapsis: number,
    public period: number,
    public system: System
  ) {
    this.radius = semiMajorAxis * system.au;
    this.geometry = new SphereGeometry(size, 50, 50);
    const color = new Color(0xaaaaaa);
    if (RANDOM_COLORS) color.setHex(stringToDecimal(name) * 0xffffff);
    this.material = new MeshPhongMaterial({ color });

    this.orbitMaterial = new MeshBasicMaterial({ color: 0x888888 });
    this.orbitGeometry = new TorusGeometry(this.radius, 0.4, 8, 100);

    this._mesh = new Mesh(this.geometry, this.material);
    this._orbitMesh = new Mesh(this.orbitGeometry, this.orbitMaterial);
  }

  get x() {
    return this.radius * Math.cos(this.theta);
  }

  get z() {
    return this.radius * Math.sin(this.theta);
  }

  get theta() {
    const position =
      this.period > 0
        ? (this.trueAnamoly + (this.system.ticks / this.period) * 360) % 360
        : this.trueAnamoly;
    return (position / 180) * Math.PI;
    // return (this.trueAnamoly / 180) * Math.PI;
  }

  get mesh() {
    this._mesh.position.set(this.x, 0, this.z);
    return this._mesh;
  }

  get orbit() {
    this._orbitMesh.rotation.x = Math.PI / 2;
    return this._orbitMesh;
  }

  update() {
    this._mesh.position.set(this.x, 0, this.z);
  }
}
