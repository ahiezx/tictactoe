/**
 * Tic Tac Toe
 * @author blazewtt https://github.com/blazewtt
 * @description A simple Tic Tac Toe game (school project)
 */

let playerX, playerO, playWithBot, saved;

// Initialize game
let winner;
let cells = document.querySelectorAll('.cell');
let gameEnded = false;
let board = Array(3).fill(null).map(() => Array(3).fill(null));
showModalSettings();

// Initialize players
let currentPlayer = 'X';
let playerXScore = localStorage.getItem('playerXScore') || 0;
let playerOScore = localStorage.getItem('playerOScore') || 0;

// Initialize modal
const setButtonEventListeners = () => {

    playerX = localStorage.getItem('playerX');
    playerO = localStorage.getItem('playerO');
    playWithBot = localStorage.getItem('playWithBot');

    try {

        if(playerX) {
            document.querySelector('#player1').value = playerX;
        }
        if(playerO) {
            document.querySelector('#player2').value = playerO;
        }
        if(playWithBot === 'true') {
            document.querySelector('#computer').checked = true;
        } else {
            document.querySelector('#computer').checked = false;
        }        

        document.querySelector('#player1-score').innerHTML = localStorage.getItem('playerXScore');
        document.querySelector('#player2-score').innerHTML = localStorage.getItem('playerOScore');

    } catch (e) {

    }

    document.querySelector('.btn-save').addEventListener('click', () => {
        resetGame();
        saved = true;
        try{

            playerX = document.querySelector('#player1').value;
            playerO = document.querySelector('#player2').value;
            playWithBot = document.querySelector('#computer').checked;        

            // use localstorage to save the settings and get the items if they exist

            localStorage.setItem('playerX', playerX);
            localStorage.setItem('playerO', playerO);
            localStorage.setItem('playWithBot', playWithBot);


            

        } catch (e) {}
        
        closeModalSettings();
    }
    );
    document.querySelector('.btn-close').addEventListener('click', () => {
        closeLeaderboard();
    });
    document.querySelector('.leaderboard-button').addEventListener('click', () => {
        showLeaderboard();
    });
}

setButtonEventListeners();

// Initialize DOM cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Check if the game has ended
        if (gameEnded) {
            return;
        }

        // Get row and column of the clicked cell
        let row = getRows(cell);
        let col = getCols(cell);

        if(localStorage.getItem('playWithBot') === 'true') {
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