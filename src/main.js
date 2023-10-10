import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog("#b9d5ff", 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Floor
const floorColor = textureLoader.load("/floor/Snow_001_COLOR.jpg");
const floorNormal = textureLoader.load("/floor/Snow_001_NORM.jpg");
const floorRoughness = textureLoader.load("/floor/Snow_001_ROUGH.jpg");
const floorAmbient = textureLoader.load("/floor/Snow_001_OCC.jpg");
const floorHeight = textureLoader.load("/floor/Snow_001_DISP.png");

// Door Texture
const doorColorTexture = textureLoader.load("/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/door/height.jpg");
const doorNormalTexture = textureLoader.load("/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/door/roughness.jpg");

// Wall
const wallColor = textureLoader.load("/wall/Wood_025_basecolor.jpg");
const wallNormal = textureLoader.load("/wall/Wood_025_normal.jpg");
const wallAmbient = textureLoader.load("/wall/Wood_025_ambientOcclusion.jpg");
const wallRoughness = textureLoader.load("/wall/Wood_025_roughness.jpg");

// SnowFlake
const snowflakeTexture = textureLoader.load('/snowflakes/8.png')

/**
 * Chalet
 */
// Group
const house = new THREE.Group();
scene.add(house);
const defaultHouseMaterial = new THREE.MeshStandardMaterial({
  map: wallColor,
  transparent: true,
  aoMap: wallAmbient,
  normalMap: wallNormal,
  roughness: wallRoughness,
  color: '#99582a'
});


// Foot
const feetHouseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 32);

const feetHouseMesh1 = new THREE.Mesh(feetHouseGeometry, defaultHouseMaterial);
feetHouseMesh1.position.set(1.5, 1.2, 1.5);

const feetHouseMesh2 = new THREE.Mesh(feetHouseGeometry, defaultHouseMaterial);
feetHouseMesh2.position.set(1.5, 1.2, -1.5);

const feetHouseMesh3 = new THREE.Mesh(feetHouseGeometry, defaultHouseMaterial);
feetHouseMesh3.position.set(-1.5, 1.2, -1.5);

const feetHouseMesh4 = new THREE.Mesh(feetHouseGeometry, defaultHouseMaterial);
feetHouseMesh4.position.set(-1.5, 1.2, 1.5);

// House Floor
const floorHouseMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 5, 5),
  defaultHouseMaterial
);
floorHouseMesh.rotation.z = Math.PI * 0.5;
floorHouseMesh.position.y = 1.8;

// Wall
const wallFaceGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.3, 32);
const wallGeometry = new THREE.CylinderGeometry(0.15, 0.15, 3.6, 32);
for (let i = 0; i < 8; i++) {
  const wallFaceLeftMesh = new THREE.Mesh(
    wallFaceGeometry,
    defaultHouseMaterial
  );
  wallFaceLeftMesh.rotation.z = Math.PI * 0.5;
  wallFaceLeftMesh.position.set(-1.3, 2 + i * 0.22, 1.5);

  const wallFaceRightMesh = new THREE.Mesh(
    wallFaceGeometry,
    defaultHouseMaterial
  );
  wallFaceRightMesh.rotation.z = Math.PI * 0.5;
  wallFaceRightMesh.position.set(1.3, 2 + i * 0.22, 1.5);

  const wallLeftMesh = new THREE.Mesh(wallGeometry, defaultHouseMaterial);
  wallLeftMesh.rotation.x = Math.PI * 0.5;
  wallLeftMesh.position.set(-2.05, 2 + i * 0.22, -0.16);

  const wallRightMesh = new THREE.Mesh(wallGeometry, defaultHouseMaterial);
  wallRightMesh.rotation.x = Math.PI * 0.5;
  wallRightMesh.position.set(2.05, 2 + i * 0.22, -0.16);

  const wallBackMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 3.9, 32),
    defaultHouseMaterial
  );
  wallBackMesh.rotation.z = Math.PI * 0.5;
  wallBackMesh.position.set(0, 2 + i * 0.22, -1.82);

  house.add(
    wallFaceLeftMesh,
    wallFaceRightMesh,
    wallLeftMesh,
    wallRightMesh,
    wallBackMesh
  );
}

// Door
const doorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2.3, 2.09, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    side: THREE.DoubleSide,
  })
);
doorMesh.position.set(0, 2.75, 1.54);

// Roof
const roofGeometry = new THREE.BoxGeometry(0.2, 3.9, 4.5)
const roofRightMesh = new THREE.Mesh(
    roofGeometry,
    defaultHouseMaterial
)
roofRightMesh.position.set(1.78, 3.94, - 0.1)
roofRightMesh.rotation.z = Math.PI * 0.35

const roofLeftMesh = new THREE.Mesh(
    roofGeometry,
    defaultHouseMaterial
)
roofLeftMesh.position.set(- 1.78, 3.94, - 0.1)
roofLeftMesh.rotation.z = Math.PI * - 0.35


house.add(
  feetHouseMesh1,
  feetHouseMesh2,
  feetHouseMesh3,
  feetHouseMesh4,
  floorHouseMesh,
  doorMesh,
  roofRightMesh,
  roofLeftMesh
);

/**
 * Snow Particles
 */

//Geometry
const snowflakeGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 100
}

snowflakeGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
// Material
const snowflakeMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: '#b9d5ff',
    transparent: true,
    alphaMap: snowflakeTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

// Snowflakes
const snowflakes = new THREE.Points(snowflakeGeometry, snowflakeMaterial)
scene.add(snowflakes)


// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 1000),
  new THREE.MeshStandardMaterial({
    map: floorColor,
    transparent: true,
    aoMap: floorAmbient,
    normalMap: floorNormal,
    roughness: floorRoughness,
    displacementMap: floorHeight,
    displacementScale: 1,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 2);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 3);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#b9d5ff");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

   // Update snowflakes
    snowflakes.position.y = elapsedTime * - 0.2

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
