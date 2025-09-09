import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/libs/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
  "/img/logo3.gltf",
  function (glb) {
    const model = glb.scene;

    scene.add(model);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
