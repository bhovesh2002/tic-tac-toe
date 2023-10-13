let board;
let currentPlayer;
let cpuPlayer;
let gameActive = false;
const messageEl = document.getElementById('message');
const boardEl = document.getElementById('board');


function startGame(playerSymbol) {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerSymbol;
    cpuPlayer = (playerSymbol === 'X') ? 'O' : 'X';
    boardEl.classList.remove('hidden');
    gameActive = true;
    messageEl.innerText = `${currentPlayer}'s turn`;
    document.querySelectorAll('.square').forEach(square => {
        square.innerText = '';
    });
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.querySelectorAll('.square')[index].innerText = currentPlayer;
        if (checkWin()) {
            messageEl.innerText = `${currentPlayer} Wins!`;
            gameActive = false;
        } else if (!board.includes('')) {
            messageEl.innerText = "It's a Tie!";
            gameActive = false;
        } else {
            currentPlayer = cpuPlayer;
            makeCpuMove();
        }
    }
}

function makeCpuMove() {
    let availableSquares = [];
    board.forEach((square, index) => {
        if (square === '') availableSquares.push(index);
    });

    if (availableSquares.length > 0) {
        let randomMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
        board[randomMove] = currentPlayer;
        document.querySelectorAll('.square')[randomMove].innerText = currentPlayer;
        if (checkWin()) {
            messageEl.innerText = `CPU Wins!`;
            gameActive = false;
        } else if (!board.includes('')) {
            messageEl.innerText = "It's a Tie!";
            gameActive = false;
        } else {
            currentPlayer = (cpuPlayer === 'X') ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        board[pattern[0]] !== '' &&
        board[pattern[0]] === board[pattern[1]] && 
        board[pattern[1]] === board[pattern[2]]
    );
}
