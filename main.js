/*----- constants -----*/ 
//
const squareState = {
    '1':  'X',
    '-1': 'O',
    '0': ''
}

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
init();
         //
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
  function init() {
    winner = false; 
    turn = 1;
    turnCount = 1;
    messageEl.innerText = "It's X's turn!"
    board = [0,0,0,0,0,0,0,0,0,];
    render();
 }

function checkForWinner() {
    let checkVal = 0;
    winningLines.forEach(function(line) {
        checkVal = board[line[0]] + board[line[1]] + board[line[2]];
    if (checkVal === 3 || checkVal === .3) {
        winner = true;
    }
})
    
   
}

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