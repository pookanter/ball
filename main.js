import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const group = new THREE.Group()
scene.add(group)

const groupTweak = gui.addFolder('group')
groupTweak.add(group.position, 'x').min(-3).max(3).step(0.01).name('x')
groupTweak.add(group.position, 'y').min(-3).max(3).step(0.01).name('y')
groupTweak.add(group.position, 'z').min(-3).max(3).step(0.01).name('z')

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(sphere)
sphere.position.y = 0.75

const sphereTweak = gui.addFolder('sphere')
sphereTweak.add(sphere.position, 'x').min(-3).max(3).step(0.01).name('x')
sphereTweak.add(sphere.position, 'y').min(-3).max(3).step(0.01).name('y')
sphereTweak.add(sphere.position, 'z').min(-3).max(3).step(0.01).name('z')
sphereTweak.addColor(sphere.material, 'color').name('color')

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.4, 2),
    new THREE.MeshBasicMaterial({ color: 0x000fff3b })
)
group.add(box)

const boxTweak = gui.addFolder('box')
boxTweak.add(box.position, 'x').min(-3).max(3).step(0.01).name('x')
boxTweak.add(box.position, 'y').min(-3).max(3).step(0.01).name('y')
boxTweak.add(box.position, 'z').min(-3).max(3).step(0.01).name('z')
boxTweak.addColor(box.material, 'color').name('color')

// Axes helper
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
// camera.position.y = 3
// camera.position.x = 3
// camera.lookAt(group.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
gui.onChange(() => {
    renderer.render(scene, camera)
})

// window.addEventListener('resize', () => {
//     console.log('window resize')
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }, false)