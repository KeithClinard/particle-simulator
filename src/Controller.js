import Constants from "./Constants";
import Engine from "./Engine";
import Vector2 from "./Vector2";

export default class Controller {
  constructor() {
    const interaction = window.app.renderer.plugins.interaction;
    interaction.on("mousedown", this.startClick);
    interaction.on("mouseup", this.endClick);
    interaction.on("rightdown", this.startClick);
    interaction.on("rightup", this.endClick);
    interaction.on("mouseleave", this.cancelClick);

    interaction.on("touchstart", this.startClick);
    interaction.on("touchend", this.endClick);
    interaction.on("touchcancel", this.cancelClick);
    interaction.on("touchleave", this.cancelClick);

    window.addEventListener("resize", this.resize);
    this.resize();

    window.controller = this;
  }

  startClick(evt) {
    evt.stopPropagation();
    this.downPosition = window.controller.getClickPosition(evt);
    this.mouseDown = true;
  }

  endClick(evt) {
    evt.stopPropagation();
    if (!this.mouseDown) {
      return;
    }
    // Left Click
    if (evt.data.button == 0) {
      const clickDisplacement = window.controller
        .getClickPosition(evt)
        .subtract(this.downPosition);
      const velocity = clickDisplacement.multiplyScalar(
        Constants.initialVelocityCoefficient
      );
      window.particleContainer.makeParticle(this.downPosition, velocity);
    }

    // Middle Click
    if (evt.data.button == 1) {
      // Disabled for now
      // window.controller.generateSystem(window.controller.getClickPosition(evt), false);
    }

    // Right Click
    if (evt.data.button == 2) {
      window.controller.generateSystem(
        window.controller.getClickPosition(evt),
        true
      );
    }
  }

  getClickPosition(evt) {
    return new Vector2(evt.data.global.x, evt.data.global.y);
  }

  cancelClick(evt) {
    evt.stopPropagation();
    this.mouseDown = false;
  }

  resize() {
    window.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  generateSystem(centerPosition, useSmoke) {
    window.particleContainer.makeParticle(
      centerPosition,
      new Vector2(0, 0),
      Constants.systemCenterMass
    );

    let radius = Constants.systemCenterToDiskDistance;
    for (let i = 1; i < Constants.systemDiskParticleCount; i++) {
      radius += Constants.systemDiskParticleDistance;

      const mass = Constants.systemParticleMass;
      const angle = Math.random() * 2 * Math.PI;
      const positionFromCenter = Vector2.createFromAngle(angle, radius);
      const position = positionFromCenter.add(centerPosition);
      const velocityOrbital = Engine.calculateOrbitalVelocity(
        Constants.systemCenterMass,
        radius
      );
      const velocity = Vector2.createFromOrthogonal(angle, velocityOrbital);

      window.particleContainer.makeParticle(position, velocity, mass, useSmoke);
    }
  }
}
