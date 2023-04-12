//S4: 체스판 다시 칠하기
const [size, ...matrixStr] = require('fs').readFileSync(0).toString().trim().split('\n')
const [M, N] = size.split(' ').map(Number)
const matrix = matrixStr.map((s) => s.split(''))

let answer = 50 * 50 + 1

const copyWholeMatrix = (original) => {
  return original.reduce((acc, currRow) => {
    acc.push([...currRow])
    return acc
  }, [])
}

const countCellsToBeRepainted = ({ matrix, startRow, startColumn, colorToBePainted }) => {
  let tempAnswer = 0
  for (let row = startRow; row < startRow + 8; row++) {
    for (let column = startColumn; column < startColumn + 8; column++) {
      const currentColor = matrix[row][column]
      if (row === startRow) {
        if (currentColor !== colorToBePainted) {
          tempAnswer++
          matrix[row][column] = colorToBePainted
        }
        colorToBePainted = colorToBePainted === 'W' ? 'B' : 'W'
      } else {
        colorToBePainted = matrix[row - 1][column] === 'W' ? 'B' : 'W'
        if (currentColor !== colorToBePainted) {
          tempAnswer++
          matrix[row][column] = colorToBePainted
        }
      }
    }
  }
  return tempAnswer
}

for (let row = 0; row <= M - 8; row++) {
  for (let column = 0; column <= N - 8; column++) {
    answer = Math.min(
      answer,
      countCellsToBeRepainted({
        matrix: copyWholeMatrix(matrix),
        startRow: row,
        startColumn: column,
        colorToBePainted: 'W',
      }),
      countCellsToBeRepainted({
        matrix: copyWholeMatrix(matrix),
        startRow: row,
        startColumn: column,
        colorToBePainted: 'B',
      }),
    )
  }
}

console.log(answer)
