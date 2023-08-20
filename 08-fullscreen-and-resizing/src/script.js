import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Textures
 */
// const image = new Image()
// const texture = new THREE.Texture(image)

// image.addEventListener('load', () => {
// 	texture.needsUpdate = true;
// })

// image.src = '/textures/door/color.jpg'
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.rotation = Math.PI / 4

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.BufferGeometry()
// const count = 500
// const positionsArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
// 	positionsArray[i] = (Math.random() - 0.5) * 4
// }

// const postionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', postionsAttribute)


// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(material, 'color')

const guifuntions = {
	spin: () => {
		gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
	}
}

gui.add(guifuntions, 'spin')

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () => {
	// update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// window.addEventListener('dblclick', () => {
// 	if (!document.fullscreenElement) {
// 		canvas.requestFullscreen()
// 	} else {
// 		document.exitFullscreen()
// 	}
// })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.LinearSRGBColorSpace

/**
 * Animate
 */
const clock = new THREE.Clock()

// let r = 0
// let r_rev = false
// let g = 0
// let b = 0

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// if (r_rev) {
	// 	r -= 0.00392156862
	// } else {
	// 	r += 0.00392156862
	// }

	// if (r >= 1) {
	// 	r_rev = true
	// 	// r = 0
	// } else if (r <= 0) {
	// 	r_rev = false
	// }
	// g += 0.01
	// if (g > 1) g = 0
	// b += 0.01
	// if (b > 1) b = 0

	// material.color = new THREE.Color(r, g, b)

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()