const board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];


const gridItems = document.querySelectorAll(".grid-item");

let turn = "player";
let gameRunning = true;

function gameWin() {
    location.reload();
}

function checkWin() {
    for (let combo of winningCombos) {
        const values = combo.map(index => board[index]);
        const xCount = values.filter(v => v === "X").length;
        const oCount = values.filter(v => v === "O").length;

        if (xCount === 3 || oCount === 3 || !board.includes("")) {
            setTimeout(gameWin, 1000);
            return true;
        }
    }
}

function calculateNextMove() {
    // Check for any winning/blocking move
    

    for (let combo of winningCombos) {
        const values = combo.map(index => board[index]);
        const xCount = values.filter(v => v === "X").length;
        const oCount = values.filter(v => v === "O").length;
        const emptyCount = values.filter(v => v === "").length;

        if ((xCount === 2 || oCount === 2) && emptyCount === 1) {
            const emptyIndex = combo.find(index => board[index] === "");
            makeAIMove(emptyIndex);
            if (checkWin()) {
                gameRunning = false;
                return;
            }
            return;
        }
    }

    // No immediate win/block, pick random empty spot
    const emptyIndices = board
        .map((v, i) => (v === "" ? i : null))
        .filter(v => v !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeAIMove(randomIndex);

    if (checkWin()) {
        gameRunning = false;
        return;
    }
}

function makeAIMove(index) {
    board[index] = "O";
    gridItems[index].textContent = "O";
    turn = "player";
}


gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", (e) => {
        if (!gameRunning) return;

        if (turn === "player" && gridItem.textContent !== "O" && gridItem.textContent !== "X") {
            gridItem.textContent = "X";
            board[gridItem.id-1] = "X";

            if (checkWin()) {
                gameRunning = false;
                return;
            }

            turn = "ai";
            setTimeout(calculateNextMove, 500);
        }
    });
});

