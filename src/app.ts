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

  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  camera.setTarget(BABYLON.Vector3.Zero());

  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.7;

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  let startPos = 2;
  sphere.position.y = startPos;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.5);
  ground.material = groundMaterial;
  groundMaterial.bumpTexture = new BABYLON.Texture("./normal.jpg", scene);

  const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
  redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
  sphere.material = redMaterial;

  let sphereVelocity = 0;
  const gravity = 0.009;
  const reboundLoss = 0.1;

  scene.registerBeforeRender(() => {
    sphereVelocity += gravity;
    let newY = sphere.position.y - sphereVelocity;
    sphere.position.y -= sphereVelocity;
    if (newY < 1) {
      sphereVelocity = (reboundLoss - 1) * sphereVelocity;
      newY = 1;
    }
    sphere.position.y = newY;
    if (Math.abs(sphereVelocity) <= gravity && newY < 1 + gravity) {
      sphere.position.y = startPos++;
    }
  });

  return scene;
};
