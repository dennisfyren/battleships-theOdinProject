import { UI } from "./animations.js";
import { Player } from "../players/playerHuman.js";
import { Computer } from "../players/playerAI.js";

const animate = new UI();

export const createPlayer = (type) => {
  const playerInfo = getData(type);
  const player = document.querySelector("." + type);
  const playerDisplay = document.createElement("div");
  for (let j = 10; j > 0; j--) {
    const box = document.createElement("div");
    for (let i = 1; i <= 10; i++) {
      const innerBox = document.createElement("div");
      innerBox.id = `${type}-${j}-${i}`;
      playerInfo.game.ships.forEach((ship) => {
        ship.position.forEach((pos) => {
          if (pos.toString() == [j, i].toString()) {
            innerBox.classList.add("ship");
          }
        });
      });
      innerBox.addEventListener("click", () => {
        animate.attack(innerBox);
      });
      innerBox.classList.add("grid-inner-box");
      box.appendChild(innerBox);
    }
    box.classList.add("grid-box");
    playerDisplay.appendChild(box);
  }
  player.appendChild(playerDisplay);
};

function getData(type) {
  const player = new Player(type);
  const computer = new Computer(type);
  if (type === "player") {
    player.game.placeShip([1, 1], 5, 0);
    player.game.placeShip([2, 4], 3, 1);
    player.game.placeShip([6, 6], 2, 0);
    player.game.placeShip([10, 1], 4, 0);
    return player;
  }
  if (type === "computer") {
    console.log("comp");
    computer.game.placeShip([9, 2], 5, 0);
    return computer;
  }
}
