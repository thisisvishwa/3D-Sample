let mixer, clock;

function setupAnimations() {
  clock = new THREE.Clock();
  mixer = new THREE.AnimationMixer(model);
  animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}

document.addEventListener('modelLoaded', setupAnimations);
document.addEventListener('animationStarted', () => {
  if (!mixer) {
    console.warn('Animation mixer is not set up.');
    return;
  }
  mixer.stopAllAction();
  setupAnimations();
});