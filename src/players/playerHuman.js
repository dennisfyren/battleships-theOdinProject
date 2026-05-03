import { Gameboard } from "../gameLogic/gameboard.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.game = new Gameboard();
  }
}
