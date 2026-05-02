export class Ship {
  constructor(length) {
    this.size = length;
    this.hits = 0;
    this.isSunk = false;
    this.position = [];
  }
  hit() {
    this.hits++;
    console.log("Yep");
    this.sink();
  }
  sink() {
    if (this.hits == this.size) {
      this.isSunk = true;
    }
  }
}
