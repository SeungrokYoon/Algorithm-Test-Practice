const dir = process.platform === 'linux' ? 'dev/stdin' : 'test.txt'

const N = require('fs').readFileSync(dir).toString().trim() * 1

const dpTable = Array.from({ length: N + 1 }, () => Array.from({ length: 10 }, () => 0))
for (let n = 0; n < 10; n++) {
  dpTable[1][n] = 1
}

for (let len = 1; len < N + 1; len++) {
  for (let startingNum = 0; startingNum < 10; startingNum++) {
    const left = startingNum - 1
    const right = startingNum + 1
    if (left >= 0) {
      dpTable[len][startingNum] += dpTable[len - 1][left]
    }
    if (right < 10) {
      dpTable[len][startingNum] += dpTable[len - 1][right]
    }
    dpTable[len][startingNum] %= 1000000000
  }
}

const sum = (dpTable[N].reduce((prev, curr) => prev + curr, 0) - dpTable[N][0]) % 1000000000
console.log(sum)
