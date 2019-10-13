import { PerspectiveCamera, WebGLRenderer, Scene } from "three";
import OrbitControls from "three-orbitcontrols";

export default class Renderer {
  _renderer: WebGLRenderer;
  _camera: PerspectiveCamera;
  constructor(domNode: HTMLDivElement) {
    console.log("renderer constructor", domNode);
    const camera = new PerspectiveCamera(
      45,
      domNode.offsetWidth / domNode.offsetHeight,
      1,
      2000
    );
    camera.position.set(0, -560, 280);
    camera.up.set(0, 0, 1);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(domNode.offsetWidth, domNode.offsetHeight);

    domNode.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls;
    this._renderer = renderer;
    this._camera = camera;
  }
  render(scene: Scene) {
    this._renderer.render(scene, this._camera);
  }
}
