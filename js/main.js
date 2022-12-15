
// Settings

let playerX, playerO, playWithBot, saved;

showModalSettings();

const setButtonEventListeners = () => {
    document.querySelector('.btn-save').addEventListener('click', () => {
        resetGame();
        saved = true;
        try{
            playerX = document.querySelector('#player1').value;
            playerO = document.querySelector('#player2').value;
            playWithBot = document.querySelector('#computer').checked;
        } catch (e) {}
        if (playWithBot) {
            playerO = 'Computer';
        }
        if (playerX === '') {
            playerX = 'Player X';
        }
        closeModalSettings();
    }
    );
}

setButtonEventListeners();

// Initialize game
let winner;
let cells = document.querySelectorAll('.cell');
let gameEnded = false;
let board = Array(3).fill(null).map(() => Array(3).fill(null));

// Initialize players
let currentPlayer = 'X';

// Initialize DOM cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameEnded) {
            return;
        }

        let row = getRows(cell);
        let col = getCols(cell);

        if(playWithBot) {
            if (isEmpty(row, col)) {
                setCell(row, col, 'X');
                cell.innerHTML = '<span class="X">X</span>';
        
                if (isGameOver()) {
                    endGame();
                } else {
                    computerMove();
                }
            }
        } else {
            if (isEmpty(row, col)) {
                setCell(row, col, currentPlayer);
                cell.innerHTML = `<span class="${currentPlayer}">${currentPlayer}</span>`;

                if (isGameOver()) {
                    endGame();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }

    });
}
);