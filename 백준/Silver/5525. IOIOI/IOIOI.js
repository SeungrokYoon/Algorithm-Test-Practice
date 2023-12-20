const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const M = +input[1]
const S = input[2]

let result = 0

let startIdx = null
let endIdx = null

let prevItem = null
let currItem = null

for (let i = 0; i < M; i++) {
  currItem = S[i]

  if (currItem === 'I') {
    if (startIdx === null) {
      startIdx = i
    } else if (prevItem === 'O') {
      endIdx = i
    }
  }

  if (prevItem === currItem || i === M - 1) {
    const indexDiff = endIdx - startIdx
    const count = Math.floor(indexDiff / 2) // P 몇짜리인지 P3
    if (count >= N) {
      result += count - N + 1
    }
    if (currItem === 'I') {
      startIdx = i
    } else {
      startIdx = null
      endIdx = null
    }
  }

  prevItem = S[i]
}

console.log(result)
