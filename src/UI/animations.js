export class UI {
  attack(element) {
    console.log(element);
    element.classList.add("attack");
    setTimeout(() => {
      element.classList.remove("attack");
    }, 800);
  }
  bounce(ship) {
    console.log("under here");
    console.log(ship);
    ship.position.forEach((pos) => {
      const box = document.querySelector(`#player-${pos[0]}-${pos[1]}`);
      box.classList.add("bounce");
      setTimeout(() => {
        box.classList.remove("bounce");
      }, 800);
    });
  }
}
