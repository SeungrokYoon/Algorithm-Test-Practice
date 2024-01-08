const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const stack = []
let answer = 0
input.slice(1).forEach((l) => {
  if (l === '0') {
    if (stack.length) {
      const [score, restTime] = stack.pop()
      if (restTime === 1) {
        answer += score
      } else {
        stack.push([score, restTime - 1])
      }
    }
  } else {
    const [_, score, restTime] = l.split(' ').map(Number)
    if (restTime === 1) {
      answer += score
    } else {
      stack.push([score, restTime - 1])
    }
  }
})

console.log(answer)
