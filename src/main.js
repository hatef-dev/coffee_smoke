import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";
const gui = new GUI();

const canvas = document.querySelector("#app");
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

gltfLoader.load("./bakedModel.glb", (gltf) => {
  const mesh = gltf.scene.children[0];
  scene.add(mesh);
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 5, 5);
scene.add(camera);

const perlinNosie = textureLoader.load("./perlin.png");
perlinNosie.wrapS = THREE.RepeatWrapping;
perlinNosie.wrapT = THREE.RepeatWrapping;

const geometry = new THREE.PlaneGeometry(1, 1, 16, 64);
geometry.translate(0, 0.5, 0);
geometry.scale(1.5, 6, 1.5);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uPerlinNoise: new THREE.Uniform(perlinNosie),
  },
  wireframe: true,
  side: THREE.DoubleSide,
  transparent: true,
});
const smoke = new THREE.Mesh(geometry, material);
smoke.position.set(0, 1.83, 0);
scene.add(smoke);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const tick = () => {
  window.requestAnimationFrame(tick);
  const elpsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elpsedTime;



  controls.update();
  renderer.render(scene, camera);
};

tick();
