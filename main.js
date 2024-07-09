import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

const marbleTexture = textureLoader.load("/public/textures/white-marble.jpg");
marbleTexture.minFilter = THREE.NearestFilter;

const brownWoodTexture = textureLoader.load("/public/textures/brown-wood.jpg");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("ambient intensity");

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.x = 2;
directionalLight.position.y = 3;
directionalLight.position.z = 4;
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(1).step(0.01).name("directional intensity");

const hemisphereLight = new THREE.HemisphereLight(0xffd700, 0xfc5e03, 1);
scene.add(hemisphereLight);

// Objects
const group = new THREE.Group();
scene.add(group);

const groupTweak = gui.addFolder("group");
groupTweak.add(group.position, "x").min(-3).max(3).step(0.01).name("x");
groupTweak.add(group.position, "y").min(-3).max(3).step(0.01).name("y");
groupTweak.add(group.position, "z").min(-3).max(3).step(0.01).name("z");

const sphereMat = new THREE.MeshStandardMaterial({ map: marbleTexture, metalness: 0.25 , roughness: 0.25 });
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 16),
  sphereMat
);
group.add(sphere);
sphere.position.y = 0.75;

const sphereTweak = gui.addFolder("sphere");
sphereTweak.add(sphere.position, "x").min(-3).max(3).step(0.01).name("x");
sphereTweak.add(sphere.position, "y").min(-3).max(3).step(0.01).name("y");
sphereTweak.add(sphere.position, "z").min(-3).max(3).step(0.01).name("z");
sphereTweak.addColor(sphere.material, "color").name("color");
sphereTweak.add(sphere.material, "metalness").min(0).max(1).step(0.01).name("metalness");
sphereTweak.add(sphere.material, "roughness").min(0).max(1).step(0.01).name("roughness");

const boxMat = new THREE.MeshStandardMaterial({ map: brownWoodTexture, metalness: 0.25 , roughness: 0.75 });
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.4, 2),
  boxMat
);
group.add(box);

const boxTweak = gui.addFolder("box");
boxTweak.add(box.position, "x").min(-3).max(3).step(0.01).name("x");
boxTweak.add(box.position, "y").min(-3).max(3).step(0.01).name("y");
boxTweak.add(box.position, "z").min(-3).max(3).step(0.01).name("z");
boxTweak.addColor(box.material, "color").name("color");

// Axes helper
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.y = 3;
camera.position.x = 3;
camera.lookAt(group.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  // alpha: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
gui.onChange(() => {
  renderer.render(scene, camera);
});
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});
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
