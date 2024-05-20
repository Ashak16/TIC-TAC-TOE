document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const print = document.getElementById('print');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let gameOver = false;

    const handleClick = function(event) {
        if (gameOver) {
            return;
        }
        if (event.target.value) {
            return;
        }

        event.target.value = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === 'X') {
                print.textContent = 'Player 1 wins!';
                setTimeout(function() {
                    alert('Player 1 wins!');
                }, 10);
            } else {
                print.textContent = 'Player 2 wins!';
                setTimeout(function() {
                    alert('Player 2 wins!');
                }, 10);
            }
        } else {
            let allFilled = true;
            for (let i = 0; i < cells.length; i++) {
                if (!cells[i].value) {
                    allFilled = false;
                    break;
                }
            }
            if (allFilled) {
                gameOver = true;
                print.textContent = 'It\'s a draw!';
                setTimeout(function() {
                    alert('It\'s a draw!');
                }, 10);
            } else {
                if (currentPlayer === 'X') {
                    currentPlayer = 'O';
                    print.textContent = 'Player 2\'s turn';
                } else {
                    currentPlayer = 'X';
                    print.textContent = 'Player 1\'s turn';
                }
            }
        }
    };

    const resetGame = function() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].value = '';
        }
        currentPlayer = 'X';
        gameOver = false;
        print.textContent = 'Player 1\'s turn';
    };

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleClick);
    }
    resetButton.addEventListener('click', resetGame);

    print.textContent = 'Player 1\'s turn';

    function checkWinner() {
    
        const Combo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < Combo.length; i++) {
            const [a, b, c] = Combo[i];
            if (cells[a].value && cells[a].value === cells[b].value && cells[a].value === cells[c].value) {
                return cells[a].value;
            }
        }
        return null;
    }
});
