const targetDir = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const initialMap = require('fs')
  .readFileSync(targetDir)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

const answer = []

function findEmptyCell(sudoku) {
  const emptyCellArr = sudoku.reduce((acc, currRow, rowIndex) => {
    currRow.forEach((val, colIndex) => (val === 0 ? acc.push([rowIndex, colIndex]) : ''))
    return acc
  }, [])

  return emptyCellArr
}

function isNotDuplicateInRowColumn({ sudoku, currentRow, currentCol, candidateNum }) {
  for (let row = 0; row < 9; row++) {
    if (sudoku[currentRow][row] === candidateNum || sudoku[row][currentCol] === candidateNum)
      return false
  }
  return true
}

function isNotDuplicateInSquare({ sudoku, currentRow, currentCol, candidateNum }) {
  const startRow = Math.floor(currentRow / 3) * 3
  const startCol = Math.floor(currentCol / 3) * 3
  for (let row = startRow; row < startRow + 3; row++) {
    for (let col = startCol; col < startCol + 3; col++) {
      if (sudoku[row][col] === candidateNum) {
        return false
      }
    }
  }
  return true
}

function recurseCandidateNum(depth, emptyCellCoordinateArr) {
  if (depth === emptyCellCoordinateArr.length) {
    const res = initialMap.map((l) => l.join(' ')).join('\n')
    answer.push(res)
    return
  }
  const [currX, currY] = emptyCellCoordinateArr[depth]
  for (let candidateNum = 1; candidateNum < 10; candidateNum++) {
    const notDuplicateInRowColumn = isNotDuplicateInRowColumn({
      sudoku: initialMap,
      currentRow: currX,
      currentCol: currY,
      candidateNum,
    })
    const notDuplicateInSquare = isNotDuplicateInSquare({
      sudoku: initialMap,
      currentRow: currX,
      currentCol: currY,
      candidateNum,
    })
    if (!(notDuplicateInRowColumn && notDuplicateInSquare)) continue
    initialMap[currX][currY] = candidateNum
    recurseCandidateNum(depth + 1, emptyCellCoordinateArr)
    initialMap[currX][currY] = 0
  }
}

recurseCandidateNum(0, findEmptyCell(initialMap))

console.log(answer[0])
