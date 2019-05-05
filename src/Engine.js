import Vector2 from "./Vector2";
import Constants from "./Constants";

export default class Engine {
  static detectCollisions() {
    const particles = window.particleContainer.particles;
    for (const particle of particles) {
      for (const secondParticle of particles) {
        const validInteraction =
          particle !== secondParticle &&
          !particle.collided &&
          !secondParticle.collided;
        if (!validInteraction) {
          continue;
        }

        const displacementVector = secondParticle.position.subtract(
          particle.position
        );
        const displacement = displacementVector.getMagnitude();
        const combinedRadii = particle.radius + secondParticle.radius;

        const canCollide = particle.canCollide && secondParticle.canCollide;
        if (canCollide && displacement < combinedRadii) {
          window.particleContainer.mergeParticles(particle, secondParticle);
        }
      }
    }
  }
  static calculateGravity() {
    const particles = window.particleContainer.particles;
    for (const particle of particles) {
      const accelerationSum = new Vector2();

      for (const secondParticle of particles) {
        const validInteraction =
          particle !== secondParticle &&
          !particle.collided &&
          !secondParticle.collided;
        if (!validInteraction) {
          continue;
        }
        const displacementVector = secondParticle.position.subtract(
          particle.position
        );
        const displacementDirection = displacementVector.normalize();
        const displacement = displacementVector.getMagnitude();
        const canGravitate =
          particle.affectedByGravity && secondParticle.generateGravity;
        if (canGravitate) {
          const acceleration =
            secondParticle.mass / (displacement * displacement);
          accelerationSum.addInplace(
            displacementDirection.multiplyScalar(acceleration)
          );
        }
      }
      particle.acceleration = accelerationSum;
    }
  }

  static updatePositions(delta) {
    const particles = window.particleContainer.particles;
    for (const particle of particles) {
      particle.update(delta);
    }
  }

  static markOutOfBounds() {
    const particles = window.particleContainer.particles;
    const cleanupWidth = Constants.screenBorderCleanupRadius;
    for (const particle of particles) {
      const outLeft = particle.position.x < 0 - cleanupWidth;
      const outRight = particle.position.x > window.innerWidth + cleanupWidth;
      const outBottom = particle.position.y < 0 - cleanupWidth;
      const outTop = particle.position.y > window.innerHeight + cleanupWidth;
      const escaped = outLeft || outRight || outBottom || outTop;

      if (escaped) {
        particle.collided = true;
      }
    }
  }

  static removeCollided() {
    window.particleContainer.removeCollided();
  }

  static addCreated() {
    window.particleContainer.addCreated();
  }

  static calculateOrbitalVelocity(planetMass, distance) {
    return Math.sqrt(planetMass / distance);
  }
}
