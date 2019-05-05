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
    const velocity = p1.weightedVelocity
      .add(p2.weightedVelocity)
      .divideScalar(sumMass);
    const position = p1.weightedPosition
      .add(p2.weightedPosition)
      .divideScalar(sumMass);
    this.makeParticle(position, velocity, sumMass);
  }

  makeParticle(position, velocity, mass, isSmoke) {
    mass = mass || Constants.particleDefaultMass;
    const particle = new Particle(
      mass,
      isSmoke,
      position,
      velocity,
      this.texture
    );
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
