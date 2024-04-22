import * as THREE from "three";

export function scene(canvas: HTMLButtonElement) {


  // Scene
  const scene = new THREE.Scene();

  /**
   * Object
   */
  
  const group = new THREE.Group();
  group.position.set(1, 0, 1);
  group.rotation.set(1, 0, 0);
  scene.add(group);

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: true })
  );
  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "#fff", wireframe: true })
  );

  cube2.position.set(1,1,1)

  group.add(cube1, cube2);
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
  renderer.render(scene, camera);
}
