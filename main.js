// Main.js

const Gameboard = (function () {
    let board = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ];

    const printBoard = () => {
        for (let i=2;i<board.length;i+=3) {
            console.log(Math.floor(i / 3), board[i - 2], board[i - 1], board[i]);
        };
    };

    return { board, printBoard };

})();

function createPlayer (number, marker) {
    const playerNumber = number;
    const playerMarker = marker;

    return { playerNumber, playerMarker };
};

const displayController = (function () {

    const htmlBoard = document.querySelectorAll(".square");

    const updateBoard = () => {
        htmlBoard.forEach((square) => {
            square.firstChild.textContent = Gameboard.board[square.getAttribute("id") - 1];
        });
    };

    const playGame = (playerA, playerB, board) => {
        const narrator = document.querySelector(".narrator");
        let i = 0;
        let playerTurn;
        let gameOver;
        narrator.textContent = "Player 1 turn:";

        const squareClickHandler = (event) => {
        
            if (i % 2 == 1) {
                narrator.textContent = "Player 1 turn";
                playerTurn = playerB;
                board[event.target.getAttribute('id') - 1] = playerB.playerMarker;
            } else {
                narrator.textContent = "Player 2 turn";
                playerTurn = playerA;
                board[event.target.getAttribute('id') - 1] = playerA.playerMarker;
            };
    
            updateBoard();
            //Gameboard.printBoard();
    
            if (i >= 4) {
                if (
                    board[0] === board[1] && board[1] === board[2] && board[2] !== ' ' ||
                    board[3] === board[4] && board[4] === board[5] && board[5] !== ' ' || 
                    board[6] === board[7] && board[7] === board[8] && board[8] !== ' ' ||
                    board[0] === board[3] && board[3] === board[6] && board[6] !== ' ' ||
                    board[1] === board[4] && board[4] === board[7] && board[7] !== ' ' ||
                    board[2] === board[5] && board[5] === board[8] && board[8] !== ' ' ||
                    board[0] === board[4] && board[4] === board[8] && board[8] !== ' ' ||
                    board[2] === board[4] && board[4] === board[6] && board[6] !== ' ' 
                )  {
                    narrator.textContent = `Player ${playerTurn.playerNumber} wins!`;
                    gameOver = true;
                    htmlBoard.forEach((square) => {
                        square.removeEventListener('click', squareClickHandler);
                    });
                };
            };
            if (i === 8) narrator.textContent = "It's a tie!";
            i++;
            event.target.removeEventListener('click', squareClickHandler);
        };

        const resetBoard = () => {
            htmlBoard.forEach((square, i) => {
                square.removeEventListener('click', squareClickHandler);
                Gameboard.board[i] = ' ';
                square.textContent = ' ';
                square.addEventListener('click', squareClickHandler);

            });
            
        };
        resetBoard();

    };

    const startGame = () => {
        const buttonDiv = document.querySelector(".button");
        const startButton = document.createElement("button");
        startButton.textContent = "Reset";
        buttonDiv.appendChild(startButton);
        startButton.addEventListener('click', (event) => {
            for (let i=0;i<9;i++){
                Gameboard.board[i] = ' ';
            };
            playGame(player1, player2, Gameboard.board);
        });
    };



    return { htmlBoard, updateBoard, startGame, playGame };
})();

const player1 = createPlayer(1, 'X');
const player2 = createPlayer(2, 'O');

displayController.updateBoard();
displayController.playGame(player1, player2, Gameboard.board);
displayController.startGame();