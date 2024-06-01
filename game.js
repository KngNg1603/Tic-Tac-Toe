const table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const player1 = 1;
const player2 = 2;
let isPlayer1Turn = true;
let counter = 0;

$(".cell").click(function() {
    const index = $(this).attr("id").split("-");
    const rowIdx = index[1];
    const colIdx = index[2];

    if (table[rowIdx][colIdx] === 0) {
        const src = (isPlayer1Turn) ? "./images/x.png" : "./images/o.png";
        const currentCellImg = $("#cell-" + rowIdx + "-" + colIdx + " .icon-img");
        
        if (currentCellImg.attr("src") === "./images/placeholder.png") {
            currentCellImg.attr("src", src);
        }

        table[rowIdx][colIdx] = (isPlayer1Turn) ? player1 : player2;
        counter++;
        checkWinner();

        isPlayer1Turn = (isPlayer1Turn)? false : true;
    }
});

function checkWinner() {
    let winner = 0;
    // Check rows 
    if (winner === 0) {
        for (let i = 0; i < 3; i++) {
            if (table[i][0] === table[i][1] && table[i][1] === table[i][2] && table[i][0] !== 0) {
                winner = table[i][0];
                break;
            }
        }
    }

    // Check columns
    if (winner === 0) {
        for (let i = 0; i < 3; i++) {
            if (table[0][i] === table[1][i] && table[1][i] === table[2][i] && table[0][i] !== 0) {
                winner = table[0][i];
                break;
            }
        }
    }

    // Check diagonals
    if (winner === 0) {
        for (let i = 0; i < 3; i++) {
            if (table[0][0] === table[1][1] && table[1][1] === table[2][2] && table[0][0] !== 0) {
                winner = table[0][0];
                break;
            } else if (table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[0][2] !== 0) {
                winner = table[0][2];
                break;
            }
        }
    }

    if (counter === 9 && winner === 0) {
        $("h1").text("It's a draw!!!");
        $("h3").text("Click any where to start a new game");
        setTimeout(function() {
            $(document).on("click", function() {
                resetGame();
            });
        }, 100);
        return
    }

    if (winner !== 0) {
        $("h1").text("Player " + winner + " wins!!!");
        $("h3").text("Click any where to start a new game");
        setTimeout(function() {
            $(document).on("click", function() {
                resetGame();
            });
        }, 100);
        return;
    }
    
}

function resetGame() {
    $(document).off("click");
    $("h1").text("Tic Tac Toe");
    $("h3").text("");
    table.forEach(row => {
        row.fill(0);
    });
    console.log(table);
    counter = 0;

    $(".icon-img").attr("src", "./images/placeholder.png");
    isPlayer1Turn = true;
}