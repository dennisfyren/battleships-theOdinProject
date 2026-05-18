export class Random {
  attack(array) {
    return Math.floor(Math.random() * array.length);
  }
  position(array, length) {
    return Math.floor(Math.random() * array.length);
  }
  rotation() {
    return Math.floor(Math.random() * 2);
  }
}
