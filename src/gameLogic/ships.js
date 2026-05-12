import { Render } from "../UI/renderUI.js";

export class Ship {
  constructor(length) {
    this.size = length;
    this.hits = 0;
    this.isSunk = false;
    this.position = [];
    //Rotation will be 0 for horizontal and 1 for vertical.
    this.rotation = 0;
    this.isSelected = false;
  }
  hit() {
    this.hits++;
    this.sink();
  }
  sink() {
    if (this.hits == this.size) {
      const render = new Render();
      this.isSunk = true;
      setTimeout(() => {
        render.log(`You sunk the enemy ship`);
      }, 1000);
    }
  }
}
