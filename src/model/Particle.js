import Vector2 from "../utils/Vector2";

export default class Particle {
  constructor(mass, isSmoke, positionX, positionY, velocityX, velocityY, texture) {
    const baseSize = 10;
    const adjustedSize = this.nearestPow2(baseSize / 2);

    this.radius = adjustedSize / 2;
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
    sprite.width = adjustedSize;
    sprite.height = adjustedSize;
    this.position = new Vector2(positionX, positionY);
    this.velocity = new Vector2(velocityX, velocityY);
    this.acceleration = new Vector2(0, 0);

    
    const red = this.decToHex2(255);
    const green = this.decToHex2(Math.floor(255 / (1 + Math.pow(this.mass / 10000, 1))));
    const blue = this.decToHex2(Math.floor(255 / (1 + Math.pow(this.mass / 1000, 1))));
    sprite.tint = parseInt('0x'+ red + green + blue);

    var mass_scale = Math.log(Math.E + this.mass / 1000);
    sprite.scale.set(mass_scale);

    this.sprite = sprite;
    this.update(0);
  }

decToHex2(dec) { 
  var hex = Number(dec).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

  update(delta){
    this.velocity.addInplace(this.acceleration.multiplyScalar(delta));
    this.position.addInplace(this.velocity.multiplyScalar(delta));
    this.sprite.position = {
      x: this.position.x,
      y: this.position.y,
    };
  }

  nearestPow2(n) {
    return 1 << (31 - Math.clz32(n));
  }
}
