export default class Vector2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static createFromAngle(angle, magnitude) {
    return new Vector2(
      magnitude * Math.cos(angle),
      magnitude * Math.sin(angle)
    );
  }

  static createFromOrthogonal(angle, magnitude) {
    return new Vector2(
      (0 - magnitude) * Math.sin(angle),
      magnitude * Math.cos(angle)
    );
  }
  /*
   *	Vector Math
   */
  add(vector) {
    var x = this.x + vector.x;
    var y = this.y + vector.y;
    return new Vector2(x, y);
  }

  addScalar(value) {
    var x = this.x + value;
    var y = this.y + value;
    return new Vector2(x, y);
  }

  subtract(vector) {
    var x = this.x - vector.x;
    var y = this.y - vector.y;
    return new Vector2(x, y);
  }

  subtractScalar(value) {
    var x = this.x - value;
    var y = this.y - value;
    return new Vector2(x, y);
  }

  multiply(vector) {
    var x = this.x * vector.x;
    var y = this.y * vector.y;
    return new Vector2(x, y);
  }

  multiplyScalar(value) {
    var x = this.x * value;
    var y = this.y * value;
    return new Vector2(x, y);
  }

  divide(vector) {
    var x = this.x / vector.x;
    var y = this.y / vector.y;
    return new Vector2(x, y);
  }

  divideScalar(value) {
    var x = this.x / value;
    var y = this.y / value;
    return new Vector2(x, y);
  }

  linearInterpolation(vector, value) {
    var x = this.x + (vector.x - this.x) * value;
    var y = this.y + (vector.y - this.y) * value;
    return new Vector2(x, y);
  }

  normalize() {
    var x = this.x / this.getMagnitude();
    var y = this.y / this.getMagnitude();
    return new Vector2(x, y);
  }

  setMagnitude(magnitude) {
    return this.normalize().multiplyScalar(magnitude);
  }

  /*
   *	In-place Vector Math
   */
  addInplace(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  addScalarInplace(value) {
    this.x += value;
    this.y += value;
  }

  subtractInplace(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  subtractScalarInplace(value) {
    this.x -= value;
    this.y -= value;
  }

  multiplyInplace(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  multiplyScalarInplace(value) {
    this.x *= value;
    this.y *= value;
  }

  divideInplace(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
  }

  divideScalarInplace(value) {
    this.x /= value;
    this.y /= value;
  }

  linearInterpolationInplace(vector, value) {
    this.x += (vector.x - this.x) * value;
    this.y += (vector.y - this.y) * value;
  }

  normalizeInplace() {
    this.x = this.x / this.getMagnitude();
    this.y = this.y / this.getMagnitude();
  }

  setMagnitudeInplace(magnitude) {
    this.normalizeInplace();
    this.multiplyScalarInplace(magnitude);
  }

  /*
   *	Other Vector Operations
   */
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
}
