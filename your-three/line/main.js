import "./style.css";
import * as three from "three";

const canvas = document.getElementById("canvas");

let fov = 40;
let aspect = canvas.clientWidth / canvas.clientHeight;
let near = 1;
let far = 500;

const main = () => {
  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0,50)
  const renderer = new three.WebGLRenderer({
    canvas,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.lookAt(0, 0, 0);

  const lineMaterial = new three.LineBasicMaterial({ color: "white" });
  const points = [
    new three.Vector3(-10, 0, 0),
    new three.Vector3(0, 10, 0),
    new three.Vector3(10, 0, 0),
  ];
  const geometry = new three.BufferGeometry().setFromPoints(points);
  const line = new three.Line(geometry, lineMaterial);
 
  const draw = () => {
    scene.add(line);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  };
  draw();
};

main();
