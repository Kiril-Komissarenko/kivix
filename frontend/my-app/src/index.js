import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

//setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });

//light
const light = new THREE.DirectionalLight(0xffffff, 7);
light.position.set(5, 5, 100);
scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//color of background
renderer.setClearColor(0xffffff, 1);

//download & set object

const loader = new GLTFLoader();
let model;
loader.load(
  "/src/logocolor.glb",
  function (glb) {
    model = glb.scene;
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

camera.position.z = 5;

//animation
renderer.setAnimationLoop(animate);

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.00003;
  }

  renderer.render(scene, camera);
}
animate();

//add canvas

document.getElementById("container").appendChild(renderer.domElement);
