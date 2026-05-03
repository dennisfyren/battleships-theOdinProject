export class UI {
  attack(element) {
    element.classList.add("attack");
    setTimeout(() => {
      element.classList.remove("attack");
    }, 1300);
  }
}
