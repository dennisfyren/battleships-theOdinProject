import { UI } from "./animations.js";
import { Player } from "../players/playerHuman.js";
import { Computer } from "../players/playerAI.js";

export class Render {
  getData(type) {
    const player = new Player(type);
    const computer = new Computer(type);
    if (type === "player") {
      player.game.placeShip([1, 2], 5, 0);
      player.game.placeShip([4, 5], 4, 0);
      player.game.placeShip([9, 1], 3, 1);
      player.game.placeShip([7, 7], 3, 0);
      player.game.placeShip([1, 10], 2, 0);
      return player;
    }
    if (type === "computer") {
      console.log("comp");
      computer.game.placeShip([2, 9], 5, 0);
      computer.game.placeShip([4, 2], 4, 1);
      computer.game.placeShip([7, 2], 3, 1);
      computer.game.placeShip([7, 6], 3, 0);
      computer.game.placeShip([2, 7], 2, 0);
      return computer;
    }
  }
  createPlayer(type) {
    const animate = new UI();
    const playerInfo = this.getData(type);
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
              if (type === "player") {
                setTimeout(() => {
                  innerBox.classList.add("ship");
                  innerBox.style.cursor = "pointer";
                }, 20);
              }
            }
          });
        });
        if (type === "computer") {
          innerBox.addEventListener("click", () => {
            const result = playerInfo.game.recieveAttack([j, i]);
            if (result === "Hit!") {
              innerBox.classList.add("hit");
              this.log(`You fired a shot at [${j}, ${i}], it's a HIT!`);
              this.rePaint(playerInfo.game.ships);
            } else if (result === "Miss!") {
              innerBox.classList.add("miss");
              this.log(`You fired a shot at [${j}, ${i}], it's a MISS.`);
            } else {
              return;
            }
          });

          innerBox.addEventListener("click", () => {
            animate.attack(innerBox);
          });
        }
        innerBox.classList.add("grid-inner-box");
        box.appendChild(innerBox);
      }
      box.classList.add("grid-box");
      playerDisplay.appendChild(box);
    }
    player.appendChild(playerDisplay);
  }
  renderLog() {
    const controls = document.querySelector(".controls");
    const window = document.createElement("div");
    window.classList.add("console");
    controls.appendChild(window);
  }
  log(message) {
    const logWindow = document.querySelector(".console");
    const p = document.createElement("p");
    p.textContent = `${message}`;
    logWindow.prepend(p);
  }
  rePaint(ship) {
    const result = ship.filter((curr) => curr.isSunk);
    if (result.length !== 0) {
      result.forEach((item) => {
        item.position.forEach((pos) => {
          const box = document.querySelector(`#computer-${pos[0]}-${pos[1]}`);
          setTimeout(() => {
            box.classList.add("sunk");
          }, 800);
        });
      });
    }
  }
}

// const animate = new UI();

// export const createPlayer = (type) => {
//   const playerInfo = getData(type);
//   const player = document.querySelector("." + type);
//   const playerDisplay = document.createElement("div");
//   for (let j = 10; j > 0; j--) {
//     const box = document.createElement("div");
//     for (let i = 1; i <= 10; i++) {
//       const innerBox = document.createElement("div");
//       innerBox.id = `${type}-${j}-${i}`;
//       playerInfo.game.ships.forEach((ship) => {
//         ship.position.forEach((pos) => {
//           if (pos.toString() == [j, i].toString()) {
//             if (type === "player") {
//               setTimeout(() => {
//                 innerBox.classList.add("ship");
//                 innerBox.style.cursor = "pointer";
//               }, 20);
//             }
//           }
//         });
//       });
//       if (type === "computer") {
//         innerBox.addEventListener("click", () => {
//           const result = playerInfo.game.recieveAttack([j, i]);
//           if (result === "Hit!") {
//             innerBox.classList.add("hit");
//           } else if (result === "Miss!") {
//             innerBox.classList.add("miss");
//           } else {
//             return;
//           }
//         });

//         innerBox.addEventListener("click", () => {
//           animate.attack(innerBox);
//         });
//       }
//       innerBox.classList.add("grid-inner-box");
//       box.appendChild(innerBox);
//     }
//     box.classList.add("grid-box");
//     playerDisplay.appendChild(box);
//   }
//   player.appendChild(playerDisplay);
// };

// function getData(type) {
//   const player = new Player(type);
//   const computer = new Computer(type);
//   if (type === "player") {
//     player.game.placeShip([1, 2], 5, 0);
//     player.game.placeShip([4, 5], 4, 0);
//     player.game.placeShip([9, 1], 3, 1);
//     player.game.placeShip([7, 7], 3, 0);
//     player.game.placeShip([1, 10], 2, 0);
//     return player;
//   }
//   if (type === "computer") {
//     console.log("comp");
//     computer.game.placeShip([2, 9], 5, 0);
//     computer.game.placeShip([4, 2], 4, 1);
//     computer.game.placeShip([7, 2], 3, 1);
//     computer.game.placeShip([7, 6], 3, 0);
//     computer.game.placeShip([2, 7], 2, 0);
//     return computer;
//   }
// }
