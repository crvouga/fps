export class GameMap {
  private scene: BABYLON.Scene;
  private ground: BABYLON.Mesh | null = null;
  private walls: BABYLON.Mesh[];

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.walls = [];
    this.createGround();
    this.createWalls();
  }

  private createGround(): void {
    this.ground = BABYLON.MeshBuilder.CreateGround(
      "mapGround",
      { width: 100, height: 100 },
      this.scene
    );
    this.ground.checkCollisions = true;

    const groundMaterial = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.scene
    );
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    this.ground.material = groundMaterial;
  }

  private createWalls(): void {
    // Create 4 walls around the ground
    const wallHeight = 5;
    const wallThickness = 2;
    const positions = [
      { x: 0, z: 50, rotation: 0 }, // North wall
      { x: 0, z: -50, rotation: 0 }, // South wall
      { x: 50, z: 0, rotation: Math.PI / 2 }, // East wall
      { x: -50, z: 0, rotation: Math.PI / 2 }, // West wall
    ];

    positions.forEach((pos, index) => {
      const wall = BABYLON.MeshBuilder.CreateBox(
        `wall${index}`,
        { height: wallHeight, width: 100, depth: wallThickness },
        this.scene
      );
      wall.position = new BABYLON.Vector3(pos.x, wallHeight / 2, pos.z);
      wall.rotation.y = pos.rotation;
      wall.checkCollisions = true;

      const wallMaterial = new BABYLON.StandardMaterial(
        `wallMaterial${index}`,
        this.scene
      );
      wallMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
      wall.material = wallMaterial;

      this.walls.push(wall);
    });
  }
}
