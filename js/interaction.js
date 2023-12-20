// js/interaction.js

// Assuming THREE, scene, camera, renderer, model, animations, and controls are initialized in other files

// Import necessary modules from Three.js
import { Raycaster, Vector2 } from 'three';

// Setup raycaster for interaction
const raycaster = new Raycaster();
const mouse = new Vector2();

function setupInteraction() {
  // Add event listener for mouse move to detect hover states
  window.addEventListener('mousemove', onMouseMove, false);

  // Add event listener for mouse click to detect interaction
  window.addEventListener('click', onMouseClick, false);
}

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // Assuming the first intersected object is the one we're interested in
    const object = intersects[0].object;

    // Dispatch an interaction event with the intersected object
    const interactionEvent = new CustomEvent('interactionEvent', { detail: { object } });
    window.dispatchEvent(interactionEvent);

    // Handle the interaction with the object, e.g., start an animation
    handleInteraction(object);
  }
}

function handleInteraction(object) {
  // Implement specific interaction logic, e.g., play animation
  // This is a placeholder function and should be implemented based on specific requirements
  console.log('Interacted with object:', object);
}

// Call setupInteraction to initialize event listeners
setupInteraction();

// Export functions if they need to be used in other modules
export { setupInteraction, onMouseMove, onMouseClick, handleInteraction };