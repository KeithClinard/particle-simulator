import Vector2 from "./utils/Vector2";


export default class Gravity {
    static calc() {
        const particles = window.particleContainer.particles;
            for (const particle of particles) {
            const accelerationSum = new Vector2();

            for (const secondParticle of particles) {
                const validInteraction = ((particle !== secondParticle) && !particle.collided && !secondParticle.collided);
                if (!validInteraction) {
                    continue;
                }

                const displacementVector = secondParticle.position.subtract(particle.position);
                const displacementDirection = displacementVector.normalize();
                const displacement = displacementVector.getMagnitude();

                const canCollide = particle.canCollide && secondParticle.canCollide;
                if(canCollide){
                    const combinedRadii = particle.radius + secondParticle.radius;
                    const collided = displacement < combinedRadii;
                    if (collided) {
                        window.particleContainer.mergeParticles(particle, secondParticle);
                    }
                }

                const canGravitate = particle.affectedByGravity && secondParticle.generateGravity;
                if (canGravitate) {
                    const acceleration = secondParticle.mass / (displacement * displacement);
                    accelerationSum.addInplace(displacementDirection.multiplyScalar(acceleration));
                }
            }
            particle.acceleration = accelerationSum;
        }
    };
}
