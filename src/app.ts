import * as BABYLON from "babylonjs";

export class App {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(canvas);
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine, this.canvas);
  }

  debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  run() {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;

  const camera = createCamera(scene);
  camera.attachControl(canvas, true);

  createHemisphericLight(scene);
  createDirectionalLight(scene);
  createPointLight(scene);
  createGround(scene);

  return scene;
};

const createCamera = (scene: BABYLON.Scene) => {
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  camera.setTarget(BABYLON.Vector3.Zero());
  return camera;
};

const createHemisphericLight = (scene: BABYLON.Scene) => {
  const hemisphericLight = new BABYLON.HemisphericLight(
    "hemisphericLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemisphericLight.intensity = 0.7;
  return hemisphericLight;
};

const createDirectionalLight = (scene: BABYLON.Scene) => {
  const directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(-1, -2, -1),
    scene
  );
  directionalLight.intensity = 0.5;
  return directionalLight;
};

const createPointLight = (scene: BABYLON.Scene) => {
  const pointLight = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(0, 10, 0),
    scene
  );
  pointLight.intensity = 0.3;
  return pointLight;
};

const createGround = (scene: BABYLON.Scene) => {
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 100, height: 100 },
    scene
  );
  ground.checkCollisions = true;
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.5);
  ground.material = groundMaterial;
  groundMaterial.bumpTexture = new BABYLON.Texture("./normal.jpg", scene);
  return ground;
};
