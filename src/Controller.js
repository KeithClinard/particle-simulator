export default class Controller {
  constructor() {
    const interaction = window.app.renderer.plugins.interaction;
    interaction.on("mousedown", this.startClick);
    interaction.on("mouseup", this.endClick);
    interaction.on("mouseleave", this.cancelClick);
    interaction.on("mousemove", this.mouseMove);

    interaction.on("touchstart", this.startClick);
    interaction.on("touchend", this.endClick);
    interaction.on("touchcancel", this.cancelClick);
    interaction.on("touchleave", this.cancelClick);
    interaction.on("touchmove", this.mouseMove);
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
        const particleVelocityCoefficient = 0.03;
        window.particleContainer.makeParticle(this.downPositionX, this.downPositionY, (evt.data.global.x - this.downPositionX) * particleVelocityCoefficient, (evt.data.global.y - this.downPositionY) * particleVelocityCoefficient);
    }

    if (evt.data.button == 1) {
        // generateParticleDisk(evt.pageX, evt.pageY);
    }

    if (evt.button == 2) {
        // generateSystem(100, 30, 5, 100000, evt.pageX, evt.pageY);
    }
  }

  cancelClick(evt) {
    evt.stopPropagation();
    this.mouseDown = false;
  }

  mouseMove(evt) {
    evt.stopPropagation();
    // ?
  }
}
