import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import cubeVertexShader from "./shaders/vertex.glsl";
import cubeFragmentShader from "./shaders/fragment.glsl";
import { BufferAttribute } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const app = document.querySelector("#app");
const canvas = document.createElement("canvas");
canvas.classList.add("webgl");
app.appendChild(canvas);

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

// Mesh

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();

const colors = new Float32Array(cubeGeometry.attributes.position.count * 3);

const colorsConf = Array.from({ length: 6 }).map((x) => {
  return [Math.random(), Math.random(), Math.random()];
});

for (let i = 0; i < cubeGeometry.attributes.position.count; i++) {
  const faceIndex = Math.floor(i / (cubeGeometry.attributes.position.count / 6));

  const color = colorsConf[faceIndex];

  colors[i * 3 + 0] = color[0];
  colors[i * 3 + 1] = color[1];
  colors[i * 3 + 2] = color[2];
}

cubeGeometry.setAttribute("aColor", new BufferAttribute(colors, 3));

const cubeMaterial = new THREE.ShaderMaterial({
  vertexShader: cubeVertexShader,
  fragmentShader: cubeFragmentShader,
  // vertexColors: THREE.VertexColors,
  // wireframe: true
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.rotation.y = Math.PI / 2;

scene.add(cube);

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-1.5, 1, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
