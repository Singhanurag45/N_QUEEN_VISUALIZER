function isSafe(board, row, col, n) {
    for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
    }
    
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) return false;
    }
    
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    
    return true;
}

function solveNQueenUtil(board, row, n, result) {
    if (row == n) {
        let boardString = "";
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                boardString += board[i][j] ? "Q " : "_ ";
            }
            boardString += "\n";
        }
        result.push(boardString);
        return false;
    }
    
    for (let j = 0; j < n; j++) {
        if (isSafe(board, row, j, n)) {
            board[row][j] = 1;
            if (solveNQueenUtil(board, row + 1, n, result)) return true;
            board[row][j] = 0;
        }
    }
    
    return false;
}

function solveNQueen() {
    const n = parseInt(document.getElementById("n").value);
    let board = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let result = [];
    solveNQueenUtil(board, 0, n, result);
    
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    if (result.length == 0) {
        resultDiv.innerHTML = "No solution exists";
    } else {
        result.forEach((boardString, index) => {
            let pre = document.createElement("pre");
            pre.innerText = `Solution ${index + 1}:\n${boardString}`;
            resultDiv.appendChild(pre);
        });
    }
}
