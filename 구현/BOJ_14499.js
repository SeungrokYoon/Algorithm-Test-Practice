const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, M, X, Y, K] = input[0]
const graph = input.slice(1, 1 + N)
const commands = input[1 + N]

const validation = (x, y) => {
  if (0 <= x && 0 <= y && x < N && y < M) return true
  return false
}

class Dice {
  constructor() {
    this.dice = Array.from({ length: 4 }, () => Array.from({ length: 3 }, () => 0))
  }
  roll(direction) {
    let originalHorizontal = [...this.dice[1]]
    originalHorizontal.push(this.dice[3][1])
    let originalVertical = []
    this.dice.forEach((row) => {
      originalVertical.push(row[1])
    })
    let newHorizontal = []
    let newVertical = []
    switch (direction) {
      case 1:
        newHorizontal = [originalHorizontal[3]].concat(originalHorizontal.slice(0, 3))
        for (let column = 0; column < 3; column++) {
          this.dice[1][column] = newHorizontal[column]
        }
        this.dice[3][1] = newHorizontal[3]
        break
      case 2:
        newHorizontal = originalHorizontal.slice(1)
        newHorizontal.push(originalHorizontal[0])
        for (let column = 0; column < 3; column++) {
          this.dice[1][column] = newHorizontal[column]
        }
        this.dice[3][1] = newHorizontal[3]
        break
      case 3:
        newVertical = originalVertical.slice(1)
        newVertical.push(originalVertical[0])
        for (let row = 0; row < 4; row++) {
          this.dice[row][1] = newVertical[row]
        }
        break
      default:
        newVertical = [originalVertical[3]].concat(originalVertical.slice(0, 3))
        for (let row = 0; row < 4; row++) {
          this.dice[row][1] = newVertical[row]
        }
    }
  }
  getTop() {
    return this.dice[1][1]
  }
  getBottom() {
    return this.dice[3][1]
  }
  setBottom(newValue) {
    this.dice[3][1] = newValue
  }
  print() {
    console.log('--dice--')
    console.log(this.dice.join('\n'))
  }
}

const solution = () => {
  let answer = ''
  const directionMap = { 1: [0, 1], 2: [0, -1], 3: [-1, 0], 4: [1, 0] }
  const dice = new Dice()
  let x = X
  let y = Y
  for (const command of commands) {
    const [dRow, dCol] = directionMap[command]
    const newRow = x + dRow
    const newCol = y + dCol
    if (!validation(newRow, newCol)) continue
    dice.roll(command)
    if (graph[newRow][newCol] === 0) {
      graph[newRow][newCol] = dice.getBottom()
    } else {
      const newValue = graph[newRow][newCol]
      dice.setBottom(newValue)
      graph[newRow][newCol] = 0
    }
    answer += dice.getTop() + '\n'
    x = newRow
    y = newCol
  }
  return answer
}
const answer = solution()
console.log(answer.trim())
