import * as BABYLON from "babylonjs";

export class Player {
  private scene: BABYLON.Scene;
  private mesh: BABYLON.Mesh;
  private camera: BABYLON.FreeCamera;
  private moveSpeed: number = 0.2;
  private jumpForce: number = 0.2;
  private isJumping: boolean = false;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;

    // Create player mesh
    this.mesh = BABYLON.MeshBuilder.CreateCylinder(
      "player",
      { height: 1.8, diameter: 1 },
      scene
    );
    this.mesh.checkCollisions = true;
    this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 0.9, 0.5);

    // Setup camera
    this.camera = new BABYLON.FreeCamera(
      "playerCamera",
      new BABYLON.Vector3(0, 1.6, 0),
      scene
    );
    this.camera.setTarget(new BABYLON.Vector3(0, 1.6, 1));
    this.camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    this.camera.applyGravity = true;
    this.camera.checkCollisions = true;
    this.camera.ellipsoid = new BABYLON.Vector3(0.5, 0.9, 0.5);

    // Parent camera to mesh
    this.camera.parent = this.mesh;

    this.setupControls();
  }

  private setupControls(): void {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          switch (kbInfo.event.code) {
            case "KeyW":
              this.mesh.moveWithCollisions(
                this.camera
                  .getDirection(BABYLON.Vector3.Forward())
                  .scale(this.moveSpeed)
              );
              break;
            case "KeyS":
              this.mesh.moveWithCollisions(
                this.camera
                  .getDirection(BABYLON.Vector3.Backward())
                  .scale(this.moveSpeed)
              );
              break;
            case "KeyA":
              this.mesh.moveWithCollisions(
                this.camera
                  .getDirection(BABYLON.Vector3.Left())
                  .scale(this.moveSpeed)
              );
              break;
            case "KeyD":
              this.mesh.moveWithCollisions(
                this.camera
                  .getDirection(BABYLON.Vector3.Right())
                  .scale(this.moveSpeed)
              );
              break;
            case "Space":
              if (!this.isJumping) {
                this.isJumping = true;
                this.mesh.moveWithCollisions(
                  new BABYLON.Vector3(0, this.jumpForce, 0)
                );
                setTimeout(() => (this.isJumping = false), 500);
              }
              break;
          }
          break;
      }
    });
  }
}
