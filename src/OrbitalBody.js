import { SphereGeometry, MeshPhongMaterial, Mesh } from "three";

// TODO: we are assuming circular orbit ATM
export default class OrbitalBody {
  constructor({ size, semiMajorAxis, plot }, { au }) {
    this.size = size;
    this.radius = semiMajorAxis * au;
    this.plot = plot; // i.e. theta

    this.geometry = new SphereGeometry(size, 50, 50);
    this.material = new MeshPhongMaterial({
      color: 0xaaaaaa
    });
    this._mesh = new Mesh(this.geometry, this.material);
  }

  get x() {
    return this.radius * Math.cos(this.theta);
  }

  get z() {
    return this.radius * Math.sin(this.theta);
  }

  get theta() {
    return (this.plot / 180) * Math.PI;
  }

  get mesh() {
    this._mesh.position.set(this.x, 0, this.z);
    return this._mesh;
  }
}
