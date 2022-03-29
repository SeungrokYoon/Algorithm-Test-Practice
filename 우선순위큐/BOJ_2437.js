const [[N], [...arr]] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

arr.sort((a, b) => a - b)

let answer = 0
const memo = { first: 0, last: 0 }
for (let i = 0; i < arr.length; i++) {
  const currentNum = arr[i]
  if (currentNum <= memo.last + 1) {
    memo.last = memo.last + currentNum
    continue
  }
  break
}
answer = memo.last + 1

console.log(answer)
