import {
  SphereGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh
} from "three";

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
    this.orbitGeometry = new TorusGeometry(this.radius, 0.4, 8, 100);
    this.orbitMaterial = new MeshBasicMaterial({ color: 0x888888 });
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
    return (this.plot / 180) * Math.PI;
  }

  get mesh() {
    this._mesh.position.set(this.x, 0, this.z);
    return this._mesh;
  }

  get orbit() {
    this._orbitMesh.rotation.x = Math.PI / 2;
    return this._orbitMesh;
  }
}
