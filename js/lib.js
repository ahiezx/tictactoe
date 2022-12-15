// Show modal settings
const showModalSettings = () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('active');
};

// Close modal settings
const closeModalSettings = () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
}

// Set modal message
const setModalMessage = (message) => {
    const modalInner = document.querySelector('.modal-inner');
    modalInner.innerHTML = `
        <p class='winner-message'>${message}</p>
        <div class="modal-buttons">
            <button class="btn btn-save">Play Again</button>
        </div>        
    `;
}

// Show leaderboard
const showLeaderboard = () => {
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard.classList.add('active');
}

// Close leaderboard
const closeLeaderboard = () => {
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard.classList.remove('active');
}

// Get rows
const getRows = (cell) => {
    return parseInt(cell.getAttribute('data-row'));
}

// Get columns
const getCols = (cell) => {
    return parseInt(cell.getAttribute('data-col'));
}

// Get the winner with winning cells
const getWinner = () => {
    // check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return [board[i][0], 'row', [i, 0, i, 1, i, 2]];
        }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return [board[0][i], 'col', [0, i, 1, i, 2, i]];
        }
    }

    // check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return [board[0][0], 'diag', [0, 0, 1, 1, 2, 2]];
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return [board[0][2], 'diag', [0, 2, 1, 1, 2, 0]];
    }

    return null;
}

// Get the cell from the board
const getCell = (row, col) => {
    return board[row][col];
}

// Set the cell on the board
const setCell = (row, col, value) => {
    board[row][col] = value;
}

// Check if the cell is empty
const isEmpty = (row, col) => {
    return board[row][col] === null;
}

// Check if the board is full
const isFull = () => {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (isEmpty(row, col)) {
                return false;
            }
        }
    }
    return true;
}

// Check if the game is over
const isGameOver = () => {
    return isFull() || getWinner() !== null;
}

// Check if the game is a draw
const isDraw = () => {
    return isFull() && getWinner() === null;
}

// Check if the game is won
const isWon = () => {
    return getWinner() !== null;
}

// Change the color of the winning cells
const changeWinningCellsColor = (winner) => {
    const winningCells = document.querySelectorAll(`[data-row="${winner[2][0]}"][data-col="${winner[2][1]}"], [data-row="${winner[2][2]}"][data-col="${winner[2][3]}"], [data-row="${winner[2][4]}"][data-col="${winner[2][5]}"]`);
    winningCells.forEach(cell => {
        cell.classList.add('winning-cell');
    });
}

const endGame = () => {

    if (isWon()) {
        winner = getWinner();
        changeWinningCellsColor(winner);
        if(winner[0] === 'X') {
            playerXScore++;
            document.querySelector('#player1-score').innerHTML = playerXScore;
        } else {
            playerOScore++;
            document.querySelector('#player2-score').innerHTML = playerOScore;
        }
        setModalMessage(`Player ${winner[0]} won!`);
        showModalSettings();
        setButtonEventListeners();
    } else if (isDraw()) {
        setModalMessage('Draw!');
        showModalSettings();
        setButtonEventListeners();
    }

    gameEnded = true;
}

const resetGame = () => {
    saved = false;
    board = Array(3).fill(null).map(() => Array(3).fill(null));
    gameEnded = false;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.classList.remove('winning-cell');
    });
}

// Bot functionallity

const computerMove = () => {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    while (!isEmpty(row, col)) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }

    setCell(row, col, 'O');
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.innerHTML = '<span class="O">O</span>';
    cell.classList.add('O');
    if (isGameOver()) {
        endGame();
    }
}