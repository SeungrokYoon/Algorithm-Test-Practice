const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const map = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => 0))

input.forEach(([x1, y1, x2, y2]) => {
  for (let i = y1; i <= y2 - 1; i++) {
    for (let j = x1; j <= x2 - 1; j++) {
      if (map[i][j]) continue
      map[i][j] = 1
    }
  }
})

let count = 0
for (let i = 1; i <= 100; i++) {
  for (let j = 1; j <= 100; j++) {
    if (map[i][j] === 1) count++
  }
}

console.log(count)
