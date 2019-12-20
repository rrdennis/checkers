/*----- constants -----*/
const numSqs = null;

/*----- app's state (variables) -----*/
// position of every checker
// selected chip
const boardState = {};
const selectedChip = null;

/*----- cached element references -----*/
// for loop
//   grab spaces (32 legal)


/*----- event listeners -----*/
// function handleSelect() {
  
// }

// function handleMove() {

// }


/*----- functions -----*/
function init() {
  $(document).ready(function () {
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
  
        if ((i < 3 || i > 4) && color === 'black') {
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
  
  });
}

init();

function render() {

}
