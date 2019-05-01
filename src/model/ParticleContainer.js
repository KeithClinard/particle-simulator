import Particle from "./Particle";

export default class ParticleContainer {
  constructor() {
    this.container = new PIXI.particles.ParticleContainer(100000);
    this.particles = [];
    window.app.stage.addChild(this.container);
    this.generateGlobalTexture();
    window.particleContainer = this;
  }

  generateGlobalTexture() {
    const graphic = new PIXI.Graphics();
    const baseSize = 10;
    const adjustedSize = this.nearestPow2(baseSize / 2);
    graphic.beginFill(0xffffff);
    graphic.drawCircle(0, 0, adjustedSize);
    this.texture = window.app.renderer.generateTexture(graphic);
  }

  nearestPow2(n) {
    return 1 << (31 - Math.clz32(n));
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

  makeParticle(x, y, velX, velY, mass) {
    mass = mass || 100;
    const particle = new Particle(mass, false, x, y, velX, velY, this.texture);
    this.container.addChild(particle.sprite);
    this.particles.push(particle);
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
}
