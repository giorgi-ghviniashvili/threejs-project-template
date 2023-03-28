import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class App {
	constructor({ container }) {
		const app = document.querySelector(container)
		const canvas = document.createElement('canvas')
		canvas.classList.add('webgl')
		app.appendChild(canvas)

		this.canvas = canvas
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
		this.clock = new THREE.Clock()

		this.init()
	}

	init() {
		this.createScene()
		this.createCamera()
		this.createRenderer()
		this.createControls()
		this.tick()

		window.addEventListener('resize', () => {
			this.onResize()
		})
	}

	createScene() {
		this.scene = new THREE.Scene()
	}

	createCamera() {
		const camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
		camera.position.set(-1.5, 1, 3)
		this.scene.add(camera)
		this.camera = camera
	}

	createRenderer() {
		const renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		})
		renderer.setSize(this.sizes.width, this.sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.renderer = renderer
	}

	createControls() {
		const controls = new OrbitControls(this.camera, this.canvas)
		controls.enableDamping = true
		this.controls = controls
	}

	onResize() {
		// Update sizes
		this.sizes.width = window.innerWidth
		this.sizes.height = window.innerHeight

		// Update camera
		this.camera.aspect = this.sizes.width / this.sizes.height
		this.camera.updateProjectionMatrix()

		// Update renderer
		this.renderer.setSize(this.sizes.width, this.sizes.height)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	tick() {
		// const elapsedTime = this.clock.getElapsedTime()

		// Update controls
		this.controls.update()

		// Render
		this.renderer.render(this.scene, this.camera)

		// Call tick again on the next frame
		window.requestAnimationFrame(() => this.tick())
	}
}

window.addEventListener("DOMContentLoaded", () => new App({container: "#graph"}))