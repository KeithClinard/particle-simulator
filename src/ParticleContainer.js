import Particle from "./Particle";
import Constants from "./Constants";

export default class ParticleContainer {
  constructor() {
    this.container = new PIXI.particles.ParticleContainer(
      Constants.maxParticles
    );
    this.particles = [];
    this.newParticles = [];
    window.app.stage.addChild(this.container);
    this.generateGlobalTexture();
    window.particleContainer = this;
  }

  generateGlobalTexture() {
    const graphic = new PIXI.Graphics();
    graphic.beginFill(0xffffff);
    graphic.drawCircle(0, 0, Constants.particleTextureSize / 2);
    this.texture = window.app.renderer.generateTexture(graphic);
  }

  mergeParticles(p1, p2) {
    p1.collided = true;
    p2.collided = true;
    const sumMass = p1.mass + p2.mass;
    const velX = (p1.velocity.x * p1.mass + p2.velocity.x * p2.mass) / sumMass;
    const velY = (p1.velocity.y * p1.mass + p2.velocity.y * p2.mass) / sumMass;
    const posX = (p1.position.x * p1.mass + p2.position.x * p2.mass) / sumMass;
    const posY = (p1.position.y * p1.mass + p2.position.y * p2.mass) / sumMass;
    this.makeParticle(posX, posY, velX, velY, sumMass);
  }

  makeParticle(x, y, velX, velY, mass, isSmoke) {
    mass = mass || Constants.particleDefaultMass;
    const particle = new Particle(mass, isSmoke, x, y, velX, velY, this.texture);
    this.newParticles.push(particle);
  }

  removeCollided() {
    this.particles = this.particles.filter(particle => {
      if (particle.collided) {
        this.container.removeChild(particle.sprite);
        return false;
      }
      return true;
    });
  }
  addCreated() {
    for (const particle of this.newParticles) {
      this.particles.push(particle);
      this.container.addChild(particle.sprite);
    }
    this.newParticles = [];
  }
}
