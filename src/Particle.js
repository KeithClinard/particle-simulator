import Vector2 from "./Vector2";
import Constants from "./Constants";

export default class Particle {
  constructor(
    mass,
    isSmoke,
    positionX,
    positionY,
    velocityX,
    velocityY,
    texture
  ) {
    this.collided = false;
    this.mass = mass;
    this.canCollide = true;
    this.generateGravity = true;
    this.affectedByGravity = true;
    this.isSmoke = isSmoke;

    if (isSmoke) {
      this.canCollide = false;
      this.generateGravity = false;
    }

    this.sprite = new PIXI.Sprite(texture);

    this.position = new Vector2(positionX, positionY);
    this.velocity = new Vector2(velocityX, velocityY);
    this.acceleration = new Vector2(0, 0);

    this.tintParticle();
    this.scaleParticle();

    this.update(0);
  }

  decToHex2(dec) {
    let hex = Number(dec).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  tintParticle(){    
    const red = this.decToHex2(255);
    const green = this.decToHex2(
      Math.floor(
        255 / (1 + Math.pow(this.mass / Constants.particleGreenChannelMax, 1))
      )
    );
    const blue = this.decToHex2(
      Math.floor(
        255 / (1 + Math.pow(this.mass / Constants.particleBlueChannelMax, 1))
      )
    );
    this.sprite.tint = parseInt("0x" + red + green + blue);
  }

  scaleParticle(){
    const maxParticleScaleMass = Constants.particleDefaultMass * Constants.particleScaleCoefficient;
    const minParticleScaleMass = Constants.particleDefaultMass;
    const particleMassDiff = maxParticleScaleMass - minParticleScaleMass;
    const scalableMass = this.mass > maxParticleScaleMass ? maxParticleScaleMass : this.mass;
    const baseScale = ((scalableMass - minParticleScaleMass) / particleMassDiff);

    // Calculate Radius
    const pixelSizeDiff = Constants.maxParticleSize - Constants.minParticleSize;
    const particleSize = (baseScale * pixelSizeDiff) + Constants.minParticleSize;
    this.radius = particleSize / 2;
    
    // Calculate Texture Scale
    const minTextureScale = Constants.minParticleSize / Constants.particleTextureSize;
    const maxTextureScale = Constants.maxParticleSize / Constants.particleTextureSize;
    const textureScale = baseScale * (maxTextureScale - minTextureScale) + minTextureScale;
    this.sprite.scale.set(textureScale);
  }

  update(delta) {
    if (this.acceleration.getMagnitude() > Constants.maxAcceleration) {
      this.acceleration.setMagnitudeInplace(Constants.maxAcceleration);
    }

    this.velocity.addInplace(this.acceleration.multiplyScalar(delta));
    this.position.addInplace(this.velocity.multiplyScalar(delta));
    this.sprite.position = {
      x: this.position.x,
      y: this.position.y
    };
  }
}
