const [n, ...arr] = require('fs').readFileSync('test/test.txt').toString().trim().split('\n')
const matrix = new Array(101).fill(0).map((n) => new Array(101).fill(0))
let answer = 0
arr.forEach((s) => {
  const [x, y] = s.split(' ').map(Number)
  const startX = x
  const startY = 100 - y - 10
  for (let row = startX; row < startX + 10; row++) {
    for (let column = startY; column < startY + 10; column++) {
      const current = matrix[row][column]
      if (current === 1) continue
      matrix[row][column] = 1
      answer++
    }
  }
})

console.log(answer)
