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




// while (true) {
//     playGame(player1, player2, Gameboard.board);
//     let replay = prompt("Would you like to play again? Enter Y for yes or N for no.")
//     if (replay === 'n' || replay === 'N'){
//         break;
//     } else {
//         for (let i=0;i<9;i++){
//             Gameboard.board[i] = ' ';
//         };
//     };
// };


const displayController = (function () {

    const htmlBoard = document.querySelectorAll(".square");

    const resetBoard = () => {
        htmlBoard.forEach((square) => {
            square.textContent = ' ';
            square.addEventListener('click', (event) => {
                event.target.textContent = playerTurn;
            });
        });
    };

    const updateBoard = () => {
        htmlBoard.forEach((square) => {
            square.firstChild.textContent = Gameboard.board[square.getAttribute("id") - 1];
        });
    };

    const playGame = (playerA, playerB, board) => {
        const narrator = document.querySelector(".narrator");
        for (let i=0;i<9;i++) {
            let index;
            let playerTurn;
            

            if (i % 2 == 0) {
                narrator.textContent = "Player 1 turn:";
                // index = prompt(`Player ${playerA.playerNumber} enter an index: `);
                // while (board[index] !== ' '){
                //     index = prompt(`Player ${playerA.playerNumber} enter an index: `);
                // };
                // board[index] = playerA.playerMarker;
                playerTurn = playerA;
    
            } else {
                narrator.textContent = "Player 2 turn:";
                // index = prompt(`Player ${playerB.playerNumber} enter an index: `);
                // while (board[index] !== ' '){
                //     index = prompt(`Player ${playerB.playerNumber} enter an index: `);
                // };
                // board[index] = playerB.playerMarker;
                playerTurn = playerB;
            };
    
            updateBoard();
            Gameboard.printBoard();
    
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
                    narrator.textContent = `Winner! Player ${playerTurn.playerNumber} has won the game!`;
                    return;
                };
            };
    
        };
        narrator.textContent = "It's a tie!";
    };



    const startGame = () => {
        const buttonDiv = document.querySelector(".button");
        const startButton = document.createElement("button");
        startButton.textContent = "Start";
        buttonDiv.appendChild(startButton);
        startButton.addEventListener('click', (event) => {
            event.target.textContent = "Reset";
            playGame(player1, player2, Gameboard.board);
        });
    };

    return { htmlBoard, resetBoard, updateBoard, startGame };

})();




const player1 = createPlayer(1, 'X');
const player2 = createPlayer(2, 'O');

displayController.updateBoard();
displayController.startGame();