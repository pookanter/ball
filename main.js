import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const group = new THREE.Group()
scene.add(group)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
sphere.position.y = 0.75

const base = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.4, 2),
    new THREE.MeshBasicMaterial({ color: 0x000fff3b })
)
group.add(sphere)
group.add(base)
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
camera.position.y = 3
camera.position.x = 3
camera.lookAt(group.position)

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// window.addEventListener('resize', () => {
//     console.log('window resize')
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }, false)