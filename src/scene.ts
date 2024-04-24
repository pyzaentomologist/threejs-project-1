import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


export function scene(canvas: HTMLButtonElement) {
  // Scene
  const scene = new THREE.Scene();
  /**
   * Object
   */

  const group = new THREE.Group();

  scene.add(group);

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: true })
  );

  group.add(cube1);
  // Axes helper

  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);
  /**
   * Sizes
   */
  const sizes = {
    width: 800,
    height: 600,
  };

  let cursor: { x: number; y: number } = { x: 0, y: 0};
  
  window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX / sizes.width - 0.5;
      cursor.y = - (e.clientY / sizes.height - 0.5);
    }
  );

  /**
   * Camera
   */
  const aspectRatio = sizes.width / sizes.height;
  const camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 100);
  // camera.position.x = 5;
  // camera.position.y = 2;
  // camera.position.z = 7;
  // const camera = new THREE.OrthographicCamera(
    // -1 * aspectRatio,
    // 1 * aspectRatio,
    // 1,
    // -1,
    // 0.1,
    // 100
  // );
  camera.position.set(0,0,3);
  // camera.rotateY(-0.5);
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  // controls.target.y = 2;
  // controls.update();
  
  // Renderer
  
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  // Clock
  // const clock = new THREE.Clock();

  // Animaions

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // Update objects
    // group.rotation.y = elapsedTime;
    // group.rotation.x = Math.sin(elapsedTime);

    // camera.position.set(
    //   Math.sin(cursor.x * Math.PI * 2) * 3,
    //   cursor.y * 5,
    //   Math.cos(cursor.x * Math.PI * 2) * 3
    // );
    
    // camera.lookAt(group.position)

    // Update controls

    controls.update();

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
}
