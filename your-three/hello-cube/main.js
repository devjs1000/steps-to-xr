import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector("#canvas");
let fov = 75;
let aspect = 2;
let near = 1;
let far = 40;
let z = 10;
const pixelRatio = window.devicePixelRatio;

const draw = () => {
  const renderer = new three.WebGLRenderer({
    canvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = z;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  const scene = new three.Scene();
  const geometry = new three.BoxGeometry(1, 1, 1);
  const material = new three.MeshPhongMaterial({
    color: 0x44aa88,
  });
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  const cube = new three.Mesh(geometry, material);

  const lightColor = "white";
  const lightIntensity = 1;
  const light = new three.DirectionalLight(lightColor, lightIntensity);
  light.position.set(camera.position.x, camera.position.y, camera.position.z);
  scene.add(light);
  makeInstance(
    {
      w: 1,
      h: 1,
      d: 1,
    },
    "red",
    0
  ).position.set(1, 0, 0);

  const render = (times) => {
    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    times *= 0.001;
    cube.rotation.x = times;
    cube.rotation.y = times;
    scene.add(cube);
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  function makeInstance(data, color, x) {
    const material = new three.MeshPhongMaterial({
      color,
    });
    const geometry = new three.BoxGeometry(data.w, data.h, data.d);
    const cube = new three.Mesh(geometry, material);
    scene.add(cube);
    scene.position.x = x;
    return cube;
  }
};

if (WebGLRenderingContext) {
  draw();
  window.onresize = draw;
} else {
  alert("not supported");
}
