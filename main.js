/*----- constants -----*/ 
//

//Define required constants:
//1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1
const squareState = {
    '1':  'X',
    '-1': 'O',
    '0': ''
}
//   Define required variables used to track the state of the game
// 1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5 , 8],
    [0, 4, 8],
    [2, 4, 6]

];



/*----- app's state (variables) -----*/ 
 //2.1) Use a board array to represent the squares.	2.2) Use a turn variable to remember whose turn it is.
//	2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.
let board, turn, winner;
let turnCount = 1;

/*----- cached element references -----*/
const messageEl = document.getElementById('message');
const boardSquares = document.querySelectorAll('div');
const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('resetButton');




/*----- event listeners -----*/ 
 boardEl.addEventListener('click', function(evt) {
    handleTurn(parseInt(evt.target.id.replace('sq', '')));
 });

resetBtn.addEventListener('click', function() {
    init();
});



/*----- functions -----*/
// 5.1) Obtain the index of the square that was clicked by either:
	//	5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
	//	5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
//	5.2) If the board has a value at the index, immediately return because that square is already taken.
//	5.3) If winner is not null, immediately return because the game is over.
//	5.4) Update the board array at the index with the value of turn.
//	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
//ß	5.6) Set the winner variable if there's a winner:
init(); 
function handleTurn (squareIdx) {
    if (!winner) {
       if (board[squareIdx] === 0) {
         board[squareIdx] = turn;
         turn *= -1;
         checkForWinner();
         render();
        }
     }
 }
 //4.1) Initialize the state variables
 //4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
	//	4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
	//	4.1.3) Initialize winner to null to represent that there is no winner 
  function init() {
    winner = false; 
    turn = 1;
    turnCount = 1;
    messageEl.innerText = "It's X's turn!"
    board = [0,0,0,0,0,0,0,0,0,];
    render();
 }
// 5.6) Set the winner variable if there's a winner:
	//	5.6.1) Loop through the each of the winning combination arrays defined.
	//	5.6.2) Total up the three board positions using the three indexes in the current combo.
	//	5.6.3) Convert the total to an absolute value (convert any negative total to positive).
	//	5.6.4) If the total equals 3, we have a winner! Set winner to the board
function checkForWinner() {
    let checkVal = 0;
    winningLines.forEach(function(line) {
        checkVal = board[line[0]] + board[line[1]] + board[line[2]];
    if (checkVal === 3 || checkVal === .3) {
        winner = true;
    }
})
    
   
}
// Render those values to the page
//If there's no winner, check if there's a tie:
//5.7.1) Set winner to 'T' if there are no more nulls in the board array.
    function render() {
        board.forEach(function(square, idx) {
         boardSquares[idx].innerText = squareState[square];
        })
        if (turnCount === 10 && !winner) {
            winner = true;
            messageEL.innerText = "Tie game, sad day!"
        } else if (!winner) {
         turnCount++;
         messageEl.innerText = `It is ${squareState[turn]}'s turn`
        } else if (winner) {
            turn *= -1;
            messageEl.innerText = `${squareState[turn]} wins!`
        }
    }