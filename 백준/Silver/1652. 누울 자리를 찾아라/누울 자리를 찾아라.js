const input = require('fs').readFileSync(0).toString().trim().split('\n');

const N = parseInt(input.shift());
const roomBlock = input.map(row => row.split(''));

let rowCount = 0;
let colCount = 0;

for (let i = 0; i < N; i++) {
    let rowBlock = 0;
    let colBlock = 0;
    for (let j = 0; j < N; j++) {
        if (roomBlock[i][j] === '.') {
            rowBlock++;
            if (rowBlock >= 2 && j === N - 1) rowCount++;
        } else {
            if (rowBlock >= 2) rowCount++;
            rowBlock = 0;
        }

        if (roomBlock[j][i] === '.') {
            colBlock++;
            if (colBlock >= 2 && j === N - 1) colCount++;
        } else {
            if (colBlock >= 2) colCount++;
            colBlock = 0;
        }
    }
}

console.log(rowCount, colCount);