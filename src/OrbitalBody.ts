import {
  SphereGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh,
  Color,
  Euler,
  Group
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

export interface BodyProperties {
  name: string;
  size: number;
  trueAnamoly?: number;
  eccentricity?: number; // TODO: unsupported
  semiMajorAxis: number;
  inclination?: number;
  longitudeOfAscNode?: number;
  argOfPeriapsis?: number;
  period?: number;
  lumoscity?: number;
  pressession?: number;
  system?: System;
}

function angleToRad(angle: number): number {
  return (angle * Math.PI) / 180;
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
  private _overall: Group;
  public name: string;
  public size: number;
  public trueAnamoly: number;
  public eccentricity: number; // TODO: unsupported;
  public semiMajorAxis: number;
  public inclination: number;
  public longitudeOfAscNode: number;
  public argOfPeriapsis: number;
  public period: number;
  public system: System;
  public pressession: number;
  public lastTick: number;
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
  constructor({
    name,
    size,
    trueAnamoly = 0,
    eccentricity = 0,
    semiMajorAxis,
    inclination = 0,
    longitudeOfAscNode = 0,
    argOfPeriapsis = 0,
    period,
    lumoscity = 0,
    pressession: pressessionPeriodOfAscNode = 0,
    system
  }: BodyProperties) {
    this.lastTick = 0;
    this.name = name;
    this.size = size;
    this.trueAnamoly = trueAnamoly;
    this.eccentricity = eccentricity;
    this.semiMajorAxis = semiMajorAxis;
    this.inclination = inclination;
    this.longitudeOfAscNode = longitudeOfAscNode;
    this.argOfPeriapsis = argOfPeriapsis;
    this.period = period;
    this.system = system;
    this.radius = semiMajorAxis * system.au;
    this.pressession = pressessionPeriodOfAscNode;
    this.geometry = new SphereGeometry(size, 50, 50);
    const color = new Color(0xaaaaaa);
    if (RANDOM_COLORS) color.setHex(stringToDecimal(name) * 0xffffff);
    this.material = new MeshPhongMaterial({ color });
    this.material.lightMapIntensity = 100;

    this.orbitMaterial = new MeshBasicMaterial({ color: 0x888888 });
    this.orbitGeometry = new TorusGeometry(this.radius, 0.4, 8, 100);

    this._mesh = new Mesh(this.geometry, this.material);
    this._orbitMesh = new Mesh(this.orbitGeometry, this.orbitMaterial);
    this._overall = new Group();
    this._overall.add(this._orbitMesh);
    this._overall.add(this._mesh);
  }

  get x() {
    return this.radius * Math.cos(this.theta);
  }

  get y() {
    return this.radius * Math.sin(this.theta);
  }

  get theta() {
    const position =
      this.period > 0
        ? (this.trueAnamoly - (this.system.ticks / this.period) * 360) % 360
        : this.trueAnamoly;
    return (position / 180) * Math.PI;
  }

  get ascNodeTheta() {
    const rotations =
      this.pressession > 0 && this.system.ticks !== 0
        ? (this.system.ticks % this.pressession) / this.pressession
        : 1;
    return (
      (angleToRad(this.longitudeOfAscNode) - 2 * Math.PI * rotations) %
      (2 * Math.PI)
    );
  }

  get overall(): Group {
    return this._overall;
  }

  update() {
    this._overall.setRotationFromEuler(
      new Euler(angleToRad(this.inclination), 0, this.ascNodeTheta, "ZXY")
    );
    this._mesh.position.set(this.x, this.y, 0);
  }
}
