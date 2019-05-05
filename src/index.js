import * as PIXI from "pixi.js";
import ParticleContainer from "./ParticleContainer";
import Controller from "./Controller";
import Engine from "./Engine";

function startApp() {
  const app = new PIXI.Application({
    backgroundColor: 0x000000,
    autoResize: true,
    resolution: window.devicePixelRatio || 1
  });
  document.body.appendChild(app.view);
  window.app = app;

  new ParticleContainer();
  new Controller();

  window.app.ticker.add(delta => {
    Engine.detectCollisions();
    Engine.calculateGravity();
    Engine.updatePositions(delta);
    Engine.markOutOfBounds();
    Engine.removeCollided();
    Engine.addCreated();
  });
}
startApp();
