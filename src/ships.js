export class Ship {
  constructor(length) {
    this.size = length;
    this.hits = 0;
    this.isSunk = false;
    this.position = [];
    //Rotation will be 0 for horizontal and 1 for vertical.
    this.rotation = 0;
  }
  hit() {
    this.hits++;
    this.sink();
  }
  sink() {
    if (this.hits == this.size) {
      this.isSunk = true;
    }
  }
}
