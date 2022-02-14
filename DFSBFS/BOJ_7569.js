const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [M, N, H] = input.shift().split(' ').map(Number)
const ripeTomatosArr = []
let emptyTomatos = 0
let unripeTomatos = 0
let ripeTomatos = 0
const tomatos = input.map((line, index) => {
  const convertedLine = line.split(' ').map(Number)
  const row = index
  const day = 0
  convertedLine.forEach((num, col) => {
    if (num === -1) {
      emptyTomatos += 1
    } else if (num === 1) {
      ripeTomatos += 1
      ripeTomatosArr.push({ row, col, day })
    } else {
      unripeTomatos += 1
    }
  })
  return convertedLine
})

const matrixValidator = (row, col) => {
  return 0 <= row && row < H * N && 0 <= col && col < M
}

const solution = () => {
  if (ripeTomatos === N * H * M - emptyTomatos) return 0
  const dRow = [N, N * -1, 1, 0, -1, 0]
  const dCol = [0, 0, 0, 1, 0, -1]
  let pointer = 0
  let answer = 0
  while (ripeTomatosArr.length > pointer) {
    const { row, col, day } = ripeTomatosArr[pointer]
    console.log('current: ', ripeTomatosArr[pointer])
    answer = day
    for (let i = 0; i < 6; i++) {
      const nextRow = dRow[i] + row
      const nextCol = dCol[i] + col
      const nextDay = day + 1
      if (matrixValidator(nextRow, nextCol) && tomatos[nextRow][nextCol] === 0) {
        tomatos[nextRow][nextCol] = 1
        unripeTomatos--
        ripeTomatosArr.push({ row: nextRow, col: nextCol, day: nextDay })
        console.log('pushed: ', { row: nextRow, col: nextCol, day: nextDay })
      }
    }
    pointer++
  }
  if (!unripeTomatos) return answer
  return -1
}

console.log(solution())
