// Main game login file
// Exporting singletone object of game

import 

let instance = null;

class GameLogic {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.resetBoard();

    return instance;
  }

  resetBoard() {
  	this.gameArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  makeMove(x, y) {
    if (!this.gameArray[y][x]) {
      this.gameArray[y][x] = 1;
    }
  }

  checkWinner() {
    let a = this.gameArray;

    // Checking horizontal lines
    for (let i = 0; i < 3; i++) {
      if (a[i][0] === a[i][1] && a[i][1] === a[i][2] && a[i][0] !== 0) return a[i][0];
    }

    // Checking vertical lines
    for (let i = 0; i < 3; i++) {
      if (a[0][i] === a[1][i] && a[1][i] === a[2][i] && a[0][i] !== 0) return a[0][i];
    }

    // Checking diagonals
    if (a[0][0] === a[1][1] && a[1][1] === a[2][2] && a[1][1] !== 0) return a[1][1];
    if (a[0][2] === a[1][1] && a[1][1] === a[2][0] && a[1][1] !== 0) return a[1][1];

    return false;
  }
}

export default GameLogic;