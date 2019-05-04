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

    const sprite = new PIXI.Sprite(texture);
    sprite.width = Constants.initialParticleSize;
    sprite.height = Constants.initialParticleSize;
    this.position = new Vector2(positionX, positionY);
    this.velocity = new Vector2(velocityX, velocityY);
    this.acceleration = new Vector2(0, 0);

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
    sprite.tint = parseInt("0x" + red + green + blue);

    const mass_scale = Math.log(
      Math.E + this.mass / Constants.particleScaleCoefficient
    );
    this.radius = mass_scale;
    sprite.scale.set(mass_scale);

    this.sprite = sprite;
    this.update(0);
  }

  decToHex2(dec) {
    let hex = Number(dec).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
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
