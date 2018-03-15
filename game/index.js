import { EventRegister } from 'react-native-event-listeners'
import BotMover from './bot';

// Main game login file
// Exporting singletone object of game

let instance = null;

// TODO Create undo functionality
class GameLogic {
  constructor() {
    if (!instance) {
      instance = this;
      this.resetBoard();
    }

    return instance;
  }

  emitChanges() {
      EventRegister.emit('gameChange');
  }

  resetBoard() {
  	this.gameArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  	this.disabled = false;

  	this.emitChanges();
  }

  setDifficulty(dif) {
    this.difficulty = dif;
  }

  makeMove(x, y) {
    if (this.disabled) return;
    if (!this.gameArray[x][y]) {
      this.gameArray[x][y] = 1;
      let winner;
      if (winner = this.checkWinner()) {
        this.handleWin(winner);

      } else if (this.checkDraw()) {

        alert('Draw');

      } else {

        this.botMove();

        if (winner = this.checkWinner()) {
            this.handleWin(winner);
        }
      }
      this.emitChanges();
    }
  }

  botMove() {
    const move = BotMover[this.difficulty](this.gameArray);
    this.gameArray[move.x][move.y] = -1;
  }

  checkDraw() {
    for (let i = 0; i < this.gameArray.length; i++) {
      for (let j = 0; j < this.gameArray.length; j++) {
        if (this.gameArray[i][j] === 0) return false;
      }
    }

    return true;
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

  handleWin(winner) {
      const winnerName = winner === 1 ? 'Player' : 'Bot ' + (this.difficulty + 1);
      this.disabled = true;
      alert(winnerName + ' has won!');
  }
}

export default GameLogic;