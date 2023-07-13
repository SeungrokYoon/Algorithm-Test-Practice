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

function recurseCandidateNum(depth, emptyCellCoordinateArr) {
  if (depth === emptyCellCoordinateArr.length) {
    const res = initialMap.map((l) => l.join(' ')).join('\n')
    answer.push(res)
    return
  }
  const [currX, currY] = emptyCellCoordinateArr[depth]
  for (let candidateNum = 1; candidateNum < 10; candidateNum++) {
    let rowClear = true
    let colClear = true
    let squareClear = true
    for (let row = 0; row < 9; row++) {
      if (initialMap[currX][row] === candidateNum) {
        rowClear = false
      }
      if (initialMap[row][currY] === candidateNum) {
        colClear = false
      }
    }
    const startRow = Math.floor(currX / 3) * 3
    const startCol = Math.floor(currY / 3) * 3
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (initialMap[row][col] === candidateNum) {
          squareClear = false
          break
        }
      }
    }
    if (!(colClear && rowClear && squareClear)) continue

    initialMap[currX][currY] = candidateNum
    recurseCandidateNum(depth + 1, emptyCellCoordinateArr)
    initialMap[currX][currY] = 0
  }
}

function solution() {
  recurseCandidateNum(0, findEmptyCell(initialMap))
}

solution()

console.log(answer[0])
