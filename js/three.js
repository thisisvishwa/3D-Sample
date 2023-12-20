// Import necessary modules from Three.js
import * as THREE from 'three';

// Import the GLTFLoader module for loading 3D models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Import shader code
import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';

// Scene, camera, and renderer declaration
let scene, camera, renderer;

// Model and animations declaration
let model, animations;

// Initialize the scene, camera, renderer, and load models
function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Set up the WebGL renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Load the 3D model
  loadModel();

  // Add resize event listener
  window.addEventListener('resize', onWindowResize, false);
}

// Function to handle window resize events
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to load the 3D model
function loadModel() {
  const loader = new GLTFLoader();
  loader.load('assets/models/example_model.glb', (gltf) => {
    model = gltf.scene;
    animations = gltf.animations;
    scene.add(model);
    setupAnimations();
    document.getElementById('loader').classList.add('hidden');
    window.dispatchEvent(new CustomEvent('modelLoaded'));
  });
}

// Function to set up animations for the model
function setupAnimations() {
  // Code to set up animations will go here
}

// Function to create the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls, animations, and render the scene
  // controls.update(); // Uncomment if using orbit controls or similar
  renderer.render(scene, camera);
}

// Call the init function to set everything up
init();

// Start the animation loop
animate();