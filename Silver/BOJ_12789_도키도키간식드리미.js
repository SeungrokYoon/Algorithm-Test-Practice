const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const data = input[1].split(' ').map(Number)

let currStudent = 1
let queueIdx = 0
const stack = []

while (queueIdx < N) {
  const dequeued = data[queueIdx]
  if (dequeued === currStudent) {
    currStudent++
    queueIdx++
  } else {
    if (stack.length && stack[stack.length - 1] === currStudent) {
      stack.pop()
      currStudent++
    } else {
      stack.push(dequeued)
      queueIdx++
    }
  }
}

while (stack.length && stack[stack.length - 1] === currStudent) {
  stack.pop()
  currStudent++
}

console.log(stack.length === 0 ? 'Nice' : 'Sad')
