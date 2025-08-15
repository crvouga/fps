import * as BABYLON from "babylonjs";

export const setupMovementControls = (
  scene: BABYLON.Scene,
  camera: BABYLON.FreeCamera
) => {
  const inputMap: { [key: string]: boolean } = {};

  window.addEventListener("keydown", (e) => {
    inputMap[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    inputMap[e.key] = false;
  });

  scene.registerBeforeRender(() => {
    const speed = 0.2;
    if (inputMap["w"] || inputMap["ArrowUp"]) {
      camera.position.addInPlace(
        camera.getDirection(BABYLON.Vector3.Forward()).scale(speed)
      );
    }
    if (inputMap["s"] || inputMap["ArrowDown"]) {
      camera.position.addInPlace(
        camera.getDirection(BABYLON.Vector3.Forward()).scale(-speed)
      );
    }
    if (inputMap["a"] || inputMap["ArrowLeft"]) {
      camera.position.addInPlace(
        camera.getDirection(BABYLON.Vector3.Right()).scale(-speed)
      );
    }
    if (inputMap["d"] || inputMap["ArrowRight"]) {
      camera.position.addInPlace(
        camera.getDirection(BABYLON.Vector3.Right()).scale(speed)
      );
    }
  });
};
