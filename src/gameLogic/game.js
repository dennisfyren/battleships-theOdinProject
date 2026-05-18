export class Game {
  constructor() {
    this.playerTurn = true;
    this.gamestart = false;
    this.isGameOver = false;
  }
  start() {
    const controls = document.querySelector("#controlWindow");
    while (controls.hasChildNodes()) {
      controls.removeChild(controls.lastChild);
    }
  }
}
