import * as THREE from "three";
import gsap from "gsap";

export function scene(canvas: HTMLButtonElement) {

  console.log(gsap)
  // Scene
  const scene = new THREE.Scene();

  /**
   * Object
   */
  
  const group = new THREE.Group();

  scene.add(group);

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: true })
  );

  group.add(cube1);
  // Axes helper

  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper)
  /**
   * Sizes
   */
  const sizes = {
    width: 800,
    height: 600,
  };

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  // camera.position.x = 5;
  // camera.position.y = 2;
  // camera.position.z = 7;
  camera.position.set(5, 2, 7);
  camera.rotateY(0.6);
  scene.add(camera);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  
  // Clock
  // const clock = new THREE.Clock();

  gsap.to(cube1.position, { duration: 1, delay: 1, y: 2 });
  gsap.to(cube1.position, { duration: 1, delay: 3, y: 0 });

  // Animaions
  
  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // // Update objects
    // group.rotation.x = Math.cos(elapsedTime);
    // camera.rotation.y = Math.sin(elapsedTime);
    // group.rotation.z = Math.sin(elapsedTime);

    // // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }
  tick();
}
