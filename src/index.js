import * as PIXI from "pixi.js";
import ParticleContainer from "./model/ParticleContainer";
import Controller from "./Controller";
import Gravity from "./Gravity";

function startApp() {
  const app = new PIXI.Application({
    width: 800,
    height: 800,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1
  });
  document.body.appendChild(app.view);
  window.app = app;

  new ParticleContainer();
  new Controller();

  const outerBorderWidth = 200;

  window.app.ticker.add(delta => {
    Gravity.calc();
    for (const particle of window.particleContainer.particles) {
      particle.update(delta);

      const outLeft = (particle.position.x < (0 - outerBorderWidth));
      const outRight = (particle.position.x > (window.innerWidth + outerBorderWidth));
      const outBottom = (particle.position.y < (0 - outerBorderWidth));
      const outTop = (particle.position.y > (window.innerHeight + outerBorderWidth));
      const escaped = outLeft || outRight || outBottom || outTop;

      if (escaped) {
          particle.collided = true;
      }
    }
    window.particleContainer.removeCollided();
  });
}
startApp();
