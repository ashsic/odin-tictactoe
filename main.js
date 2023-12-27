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

function playGame (playerA, playerB, board) {
    for (let i=0;i<9;i++) {
        let index;
        let playerTurn;
        if (i % 2 == 0) {
            index = prompt(`Player ${playerA.playerNumber} enter an index: `);
            while (board[index] !== ' '){
                index = prompt(`Player ${playerA.playerNumber} enter an index: `);
            };
            board[index] = playerA.playerMarker;
            playerTurn = playerA;

        } else {
            index = prompt(`Player ${playerB.playerNumber} enter an index: `);
            while (board[index] !== ' '){
                index = prompt(`Player ${playerB.playerNumber} enter an index: `);
            };
            board[index] = playerB.playerMarker;
            playerTurn = playerB;
        };

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
                console.log(`Winner! Player ${playerTurn.playerNumber} has won the game!`);
                return;
            }
        };



    };
    console.log("It's a tie!");
};

const player1 = createPlayer(1, 'X');
const player2 = createPlayer(2, 'O');

while (true) {
    playGame(player1, player2, Gameboard.board);
    let replay = prompt("Would you like to play again? Enter Y for yes or N for no.")
    if (replay === 'n' || replay === 'N'){
        break;
    } else {
        for (let i=0;i<9;i++){
            Gameboard.board[i] = ' ';
        }
    }
};
