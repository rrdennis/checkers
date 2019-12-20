// Constants
function makeCheckerBoard() {
  const checkerBoard = [];

  let first = 'black';
  let second = 'red';
  let color;
  
  for (let i = 0; i < 8; i++) {
    checkerBoard.push([]);
    [first, second] = [second, first];

    for (let j = 0; j < 8; j++) {
      color = (j % 2 === 1) ? second : first;
      let tile = new Tile([i, j], color);
      checkerBoard[i][j] = tile;
    }
  }
  return checkerBoard;
}

// Application State (variables)
class Checker {
  constructor(color) {
    this.color = color;
    this.position = null;
    this.isKing = false;
    this.isActive = true;
  }
  move(end, board, opponent) {
    if (isRedTile(end)) {
      console.log('move() -> "Illegal move!"');

    } else {
      let [startRow, startCol] = this.position;
      let [endRow, endCol] = end;

      let isBlack = this.color === 'black';

      let startTile = board[startRow][startCol];
      let endTile = board[endRow][endCol];

      let blackMvRowOk = (endRow === startRow + 1);
      let redMvRowOk = (endRow === startRow - 1);

      let moveOk = isBlack ? blackMvRowOk : redMvRowOk;

      if (moveOk) {
        this.position = end;
        startTile.occupied = false;
        startTile.occupant = null;
        endTile.occupied = true;
        endTile.occupant = this.color;
      }

      let blkJumpRowOk = (endRow === startRow + 2);
      let redJumpRowOk = (endRow === startRow - 2);

      let jumpRowOk = (isBlack) ? blkJumpRowOk : redJumpRowOk;
      let jumpColsOk = ((endCol === startCol + 2) || (endCol === startCol - 2));

      let jumpOk = (jumpRowOk && jumpColsOk);

      if (jumpOk) {
        let jumpedRow = (isBlack) ? startRow + 1 : endRow + 1;
        let jumpedCol = (endCol > startCol) ? startCol + 1 : startCol - 1;
        
        let jumpedTile = board[jumpedRow][jumpedCol];

        let isOccupied = jumpedTile.occupied;
        let occupiedBy = jumpedTile.occupant;

        if (isOccupied && (occupiedBy !== this.color)) {
          this.position = end;
          startTile.occupied = false;
          jumpedTile.occupied = false;
          endTile.occupied = true;

          opponent.checkers.forEach((checker, i) => {
            let checkerRow = checker.position[0];
            let checkerCol = checker.position[1];
            if (checkerRow === jumpedRow && checkerCol === jumpedCol) {
              checker.isActive = false;
              checker.position = [-1, -1];
            }
          });
        }
      }
    }
  }
  remove() {

  }
  jump() {

  }
  crown() {
    
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.checkers = [];
    for (let i = 0; i < 12; i++) {
      this.checkers[i] = new Checker(color);
    }
  }
  placeCheckers(board) {
    let starts = [];
    const blackStarts = [
      [0,1], [0,3], [0,5], [0,7],
      [1,0], [1,2], [1,4], [1,6],
      [2,1], [2,3], [2,5], [2,7]
    ];
    const redStarts = [
      [5,0], [5,2], [5,4], [5,6],
      [6,1], [6,3], [6,5], [6,7],
      [7,0], [7,2], [7,4], [7,6]
    ];
    let arr = this.color === 'black' ? blackStarts : redStarts;
    arr.forEach(start => starts.push(start));

    this.checkers.forEach((checker, i) => {
      checker.position = starts[i]; // [0,1]
      let row = starts[i][0];
      let col = starts[i][1];
      let tile = board[row][col];
      tile.occupied = true;
      tile.occupant = checker.color;
    });
  }
}

class Tile {
  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.occupied = false;
    this.occupant = null;
  }
}

// Cached Element References


// Event Listeners


// Functions
function isRedTile(position) {

  const isEven = n => n % 2 === 0;

  const [row, col] = position;

  let rowColEven = isEven(row) && isEven(col);
  let rowColOdd = !isEven(row) && !isEven(col);
  
  return rowColEven || rowColOdd;
}

function init() {

    const $board = $('.board');
  
    let first = 'black';
    let second = 'red';
    let color;
  
    for (let i = 0; i < 8; i++) {
      [first, second] = [second, first];
  
      for (let j = 0; j < 8; j++) {
        let $tile = $('<div></div>');
        color =  j % 2 === 1 ? second : first;
        $tile.addClass(color);
        $board.append($tile);
  
        if ((i < 3 || i > 4) && (color === 'black')) {
          let $checker = $('<div></div>');
          color = i < 3 ? 'black' : i > 4 ? 'red' : {};
          $checker.addClass(color);
          $checker.addClass('checker');
          $tile.append($checker);
        }
      }
    }
  
    $board.on('click', function(e) { // user clicks on board
      let $selected = $(e.target); // tile (div) or checker
  
      if ($selected.hasClass('checker')) { // checker actions...
        $selected.toggleClass('float'); // pick up/put down a checker

      }
    });

}

init();

function render() {
  
}

const myBoard = makeCheckerBoard();

const playerOne = new Player('Ryan', 'black');
const playerTwo = new Player('James', 'red');

playerOne.placeCheckers(myBoard);
playerTwo.placeCheckers(myBoard);

const onePiece = playerOne.checkers[8];
console.log(onePiece.position);

onePiece.move([3,0], myBoard);
console.log(onePiece.position);

onePiece.move([4,1], myBoard);
console.log(onePiece.position);

const twoPiece = playerTwo.checkers[0];
console.log(twoPiece.position);

twoPiece.move([3,2], myBoard, playerOne);
console.log(twoPiece.position);
console.log(playerOne.checkers);
