import Constants from "./Constants";

export default class Controller {
  constructor() {
    const interaction = window.app.renderer.plugins.interaction;
    interaction.on("mousedown", this.startClick);
    interaction.on("mouseup", this.endClick);
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
    this.downPositionX = evt.data.global.x;
    this.downPositionY = evt.data.global.y;
    this.mouseDown = true;
  }

  endClick(evt) {
    evt.stopPropagation();
    if (!this.mouseDown) {
      return;
    }
    if (evt.data.button == 0) {
      window.particleContainer.makeParticle(
        this.downPositionX,
        this.downPositionY,
        (evt.data.global.x - this.downPositionX) *
          Constants.initialVelocityCoefficient,
        (evt.data.global.y - this.downPositionY) *
          Constants.initialVelocityCoefficient
      );
    }

    if (evt.data.button == 1) {
      window.controller.generateSystem(evt.data.global.x, evt.data.global.y);
    }
  }

  cancelClick(evt) {
    evt.stopPropagation();
    this.mouseDown = false;
  }

  resize() {
    window.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  generateSystem(centerX, centerY) {
    window.particleContainer.makeParticle(
      centerX,
      centerY,
      0,
      0,
      Constants.systemCenterMass
    );

    let radius = Constants.systemCenterToDiskDistance;
    for (let i = 1; i < Constants.systemDiskParticleCount; i++) {
      radius += Constants.systemDiskParticleDistance;

      const mass = Constants.systemParticleMass;
      const angle = Math.random() * 2 * Math.PI;
      const positionX = radius * Math.cos(angle) + centerX;
      const positionY = radius * Math.sin(angle) + centerY;
      const velocityOrbital = Math.sqrt(
        (Constants.systemCenterMass + mass) / radius
      );
      const velocityX = (0 - velocityOrbital) * Math.sin(angle);
      const velocityY = velocityOrbital * Math.cos(angle);

      window.particleContainer.makeParticle(
        positionX,
        positionY,
        velocityX,
        velocityY,
        mass,
        true
      );
    }
  }
}
