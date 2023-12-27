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

function createGame (playerA, playerB, currentBoard) {
    for (let i=0;i<9;i++) {

        if (currentBoard.board[2] == 'X') {
            console.log("yes");
        }
        

        if (i % 2 == 0) {
            let index = prompt(`Player ${playerA.playerNumber} enter an index: `);
            while (currentBoard.board[index] !== ' '){
                index = prompt(`Player ${playerA.playerNumber} enter an index: `);
            };
            currentBoard.board[index] = playerA.playerMarker;

        } else {
            let index = prompt(`Player ${playerB.playerNumber} enter an index: `);
            while (currentBoard.board[index] !== ' '){
                index = prompt(`Player ${playerB.playerNumber} enter an index: `);
            };
            currentBoard.board[index] = playerB.playerMarker;
        };

        currentBoard.printBoard();

    }
};

const player1 = createPlayer(1, 'X');
const player2 = createPlayer(2, 'O');
createGame(player1, player2, Gameboard);