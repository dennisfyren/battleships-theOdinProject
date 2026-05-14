import { UI } from "./animations.js";
import { Player } from "../players/playerHuman.js";
import { Computer } from "../players/playerAI.js";

export class Render {
  constructor() {
    this.gamestart = false;
    this.player = this.getData("player");
    this.computer = this.getData("computer");
  }
  getData(type) {
    const player = new Player(type);
    const computer = new Computer(type);
    if (type === "player") {
      player.game.placeShip([1, 1], 5, 0);
      player.game.placeShip([1, 2], 4, 0);
      player.game.placeShip([1, 5], 3, 0);
      player.game.placeShip([1, 7], 3, 0);
      player.game.placeShip([1, 9], 2, 0);
      return player;
    }
    if (type === "computer") {
      computer.game.placeShip([2, 9], 5, 0);
      computer.game.placeShip([4, 2], 4, 1);
      computer.game.placeShip([7, 2], 3, 1);
      computer.game.placeShip([7, 6], 3, 0);
      computer.game.placeShip([2, 7], 2, 0);
      return computer;
    }
  }
  renderArea() {}
  createPlayer(type) {
    const animate = new UI();
    const playerInfo = this.player;
    console.log(playerInfo);
    const player = document.querySelector("." + type);
    const playerDisplay = document.createElement("div");
    for (let j = 10; j > 0; j--) {
      const box = document.createElement("div");
      for (let i = 1; i <= 10; i++) {
        const innerBox = document.createElement("div");
        innerBox.addEventListener("click", () => {
          const boxes = document.querySelectorAll(".selected");
          if (boxes.length !== 0) {
            boxes.forEach((box) => {
              box.classList.remove("selected");
            });
          }
          playerInfo.game.ships.forEach((ship) => {
            ship.isSelected = false;
          });
        });
        innerBox.id = `${type}-${j}-${i}`;
        playerInfo.game.ships.forEach((ship) => {
          ship.position.forEach((pos) => {
            if (pos.toString() == [j, i].toString()) {
              if (type === "player") {
                innerBox.addEventListener("click", () => {
                  ship.isSelected = true;
                  playerInfo.game.ships.forEach((newShip) => {
                    if (newShip.isSelected === true) {
                      newShip.position.forEach((pos) => {
                        const box = document.querySelector(
                          `#player-${pos[0]}-${pos[1]}`,
                        );
                        box.classList.add("selected");
                      });
                    }
                  });
                });
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
            if (this.gamestart === false) {
              this.log(`Please start the game first!`);
              return;
            }
            animate.attack(innerBox);
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

          innerBox.addEventListener("click", () => {});
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
    if (logWindow.childElementCount > 5) {
      logWindow.removeChild(logWindow.lastChild);
    }
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
  showName() {
    const controlArea = document.querySelector(".controls");
    const div = document.createElement("div");
    div.id = "nameDiv";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "nameInput";
    nameInput.placeholder = "Enter name";
    const message = document.createElement("p");
    message.textContent = "Welcome to Battleships! Enter your name to begin.";
    message.classList.add("welcome");
    controlArea.appendChild(div);
    div.appendChild(message);
    div.appendChild(nameInput);
    div.id = "controlWindow";
    const start = document.createElement("button");
    start.textContent = "Place Ships";
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.processName(div);
      }
    });
    start.addEventListener("click", () => {
      this.processName(div);
    });
    div.appendChild(start);
  }
  processName(target) {
    if (nameInput.value === "") {
      this.log(`Please enter your name`);
      return;
    }
    const div = target;
    console.log(div);
    this.clearLog();
    this.log(
      `Welcome ${nameInput.value}! This is a classic game of Battleships, place your ships and ATTACK when ready!`,
    );
    div.style.opacity = "0%";
    setTimeout(() => {
      this.clearControls();
      div.style.opacity = "100%";
    }, 600);
    setTimeout(() => {
      this.renderButtons();
    }, 750);
  }
  renderButtons() {
    const controlArea = document.querySelector("#controlWindow");
    const div = document.createElement("div");
    controlArea.appendChild(div);

    const moveButtons = document.createElement("div");
    moveButtons.classList.add("move-buttons");
    div.appendChild(moveButtons);

    const upButton = document.createElement("button");
    upButton.textContent = "UP";
    upButton.addEventListener("click", () => {
      this.move("up");
    });
    const downButton = document.createElement("button");
    downButton.textContent = "DOWN";
    const leftButton = document.createElement("button");
    leftButton.textContent = "LEFT";
    const rightButton = document.createElement("button");
    rightButton.textContent = "RIGHT";
    const rotateButton = document.createElement("button");
    rotateButton.textContent = "ROTATE";
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "CONFIRM";

    moveButtons.appendChild(upButton);
    moveButtons.appendChild(downButton);
    moveButtons.appendChild(leftButton);
    moveButtons.appendChild(rightButton);
    moveButtons.appendChild(rotateButton);
    // moveButtons.appendChild(confirmButton);

    const attack = document.createElement("button");
    attack.textContent = "ATTACK";
    attack.id = "attack";
    div.appendChild(attack);
    attack.addEventListener("click", () => {
      this.log("Attack!");
    });
  }
  move(direction) {
    const selected = this.player.game.ships.find(
      (ship) => ship.isSelected === true,
    );
    const index = this.player.game.ships.indexOf(
      this.player.game.ships.find((ship) => ship.isSelected === true),
    );
    if (selected === undefined) return;
    switch (direction) {
      case "up":
        const newPosition = selected.position[0][0] + 1;
        this.clearPlayerGrid();
        this.player.game.ships.splice(index, 1);
        if (this.player.game.checkCollision(newPosition) === false) {
          selected.position[0][0] = selected.position[0][0] + 1;
          this.player.game.ships.push(selected);
          this.player.game.placeShip(
            selected.position[0],
            selected.length,
            selected.rotation,
          );
        } else {
          // this.player.game.ships.push(selected);
        }
        console.log(this.player.game.ships);
        break;
      case "down":
        break;
      case "left":
        break;
      case "right":
        break;
    }
    this.createPlayer("player");
  }
  rotate() {
    const selected = this.player.game.ships.find(
      (ship) => ship.isSelected === true,
    );
  }
  removeShip(ship) {
    console.log(ship.position);
    ship.position.forEach((pos) => {
      const box = document.querySelector(`#player-${pos[0]}-${pos[1]}`);
      box.classList.remove("ship");
      box.classList.remove("selected");
    });
  }
  // renderShip(ship) {
  //   ship.position.forEach((pos) => {
  //     const box = document.querySelector(`#player-${pos[0]}-${pos[1]}`);
  //     box.classList.add("ship");
  //     box.classList.add("selected");
  //   });
  // }
  clearControls() {
    const window = document.querySelector("#controlWindow");
    while (window.hasChildNodes()) {
      window.removeChild(window.lastChild);
    }
  }
  clearLog() {
    const log = document.querySelector(".console");
    while (log.hasChildNodes()) {
      log.removeChild(log.lastChild);
    }
  }
  clearPlayerGrid() {
    const grid = document.querySelector(".player");
    while (grid.hasChildNodes()) {
      grid.removeChild(grid.lastChild);
    }
  }
}
