import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import gsap from "gsap";

declare global {
  interface Document {
    webkitFullScreenElement: any;
    webkitExitFullscreen: any;
  }
  interface HTMLButtonElement {
    webkitRequestFullScreen: any;
  }
}

export function scene(canvas: HTMLButtonElement) {
  /**
   * Textures
   */
  const loadingManager = new THREE.LoadingManager();

  // loadingManager.onStart = () => {
  //   console.log("Start");
  // };
  // loadingManager.onProgress = () => {
  //   console.log("Progress");
  // };
  // loadingManager.onError = () => {
  //   console.log(loadingManager);
  // };

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
  alphaTexture.colorSpace = THREE.SRGBColorSpace;
  const heightTexture = textureLoader.load("/textures/door/height.jpg");
  heightTexture.colorSpace = THREE.SRGBColorSpace;
  const normalTexture = textureLoader.load("/textures/door/normal.jpg");
  normalTexture.colorSpace = THREE.SRGBColorSpace;
  const ambientOcclusionTexture = textureLoader.load(
    "/textures/door/ambientOcclusion.jpg"
  );
  ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
  const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
  metalnessTexture.colorSpace = THREE.SRGBColorSpace;
  const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
  roughnessTexture.colorSpace = THREE.SRGBColorSpace;

  //Transforming texture

  // colorTexture.repeat.x = 2;
  // colorTexture.repeat.y = 3;
  // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
  // colorTexture.wrapT = THREE.MirroredRepeatWrapping;

  // colorTexture.offset.x = 0.5;
  // colorTexture.offset.y = 0.5;

  // colorTexture.center.x = 0.5;
  // colorTexture.center.y = 0.5;

  // colorTexture.rotation = Math.PI / 4;

  //Filtering and Mipmapping

  colorTexture.generateMipmaps = false;
  // colorTexture.minFilter = THREE.NearestFilter;

  // colorTexture.magFilter = THREE.NearestFilter;

  // GUI - Debug
  const gui = new GUI({
    width: 300,
    title: "Nice dewbug UI",
    closeFolders: true,
  });
  // gui.close();
  // gui.hide();
  function checkHash() {
    if (window.location.hash === "#hello") {
      gui.show();
    }
  }
  function checkKeyboardKey(e: KeyboardEvent) {
    if (e.key == "h") {
      gui.show(gui._hidden);
    }
  }

  window.addEventListener("load", checkHash);
  window.addEventListener("hashchange", checkHash);
  window.addEventListener("keydown", checkKeyboardKey);

  const debugObject = { color: "", spin: () => {}, subdivision: 0 };

  // Scene
  const scene = new THREE.Scene();
  /**
   * Object
   */

  const group = new THREE.Group();

  scene.add(group);

  // const geometry = new THREE.BufferGeometry();

  // const count: number = 50;

  // const positionsArray = new Float32Array(count * 3 * 3);

  // for (let i = 0; i < count * 3 *3; i++) {
  //   positionsArray[i] = Math.random() - 0.5;
  // }

  // const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  // geometry.setAttribute("position", positionsAttribute);

  debugObject.color = "#00ff00";
  let cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    // geometry,
    new THREE.MeshBasicMaterial({
      map: colorTexture,
      // wireframe: true
    })
  );
  console.log(cube1.geometry.attributes.uv);
  group.add(cube1);
  // Axes helper

  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);
  /**
   * Sizes
   */
  let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let cursor: { x: number; y: number } = { x: 0, y: 0 };

  window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
  });

  /**
   * Camera
   */
  let aspectRatio = sizes.width / sizes.height;

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
  camera.position.set(0, 0, 3);
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

  // addFolder

  const cubeTweaks = gui.addFolder("Awesome Cube");
  // cubeTweaks.close();
  // gui Add

  cubeTweaks.add(group.position, "y", -3, 3, 0.01).name("elevation");

  // let myObject = {
  //   myVariable: 1337
  // };

  // gui.add(myObject, 'myVariable');

  cubeTweaks.add(group, "visible");
  cubeTweaks.add(cube1.material, "wireframe");
  cubeTweaks.addColor(debugObject, "color").onChange(() => {
    cube1.material.color.set(debugObject.color);
  });

  debugObject.spin = () => {
    gsap.to(group.rotation, { y: group.rotation.y + Math.PI * 2 });
  };

  cubeTweaks.add(debugObject, "spin");

  // debugObject.subdivision = 2;
  // cubeTweaks
  //   .add(debugObject, "subdivision")
  //   .min(1)
  //   .max(20)
  //   .step(1)
  //   .onFinishChange(() => {
  //     cube1.geometry.dispose();
  //     (cube1.geometry = new THREE.BoxGeometry(
  //       1,
  //       1,
  //       1,
  //       debugObject.subdivision,
  //       debugObject.subdivision,
  //       debugObject.subdivision
  //     )),
  //       new THREE.MeshBasicMaterial({
  //         color: debugObject.color,
  //         wireframe: true,
  //       });
  //   });

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    // Handle fullscreen
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullScreenElement;
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });
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
