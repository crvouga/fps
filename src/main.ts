import { App } from "./app";

console.log(`main.ts starting ${App.name}`);
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas not found");
  }

  const app = new App(canvas);

  app.run();
});
