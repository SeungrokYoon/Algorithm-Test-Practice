const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const answer = []
const stack = []

const N = +input.shift()

input.forEach((l) => {
  const command = +l[0]
  let num = 0
  switch (command) {
    case 1:
      num = +l.split(' ')[1]
      stack.push(num)
      break
    case 2:
      if (stack.length) {
        answer.push(stack.pop())
      } else {
        answer.push(-1)
      }
      break
    case 3:
      answer.push(stack.length)
      break
    case 4:
      answer.push(stack.length === 0 ? 1 : 0)
      break
    default:
      if (stack.length) {
        answer.push(stack[stack.length - 1])
      } else {
        answer.push(-1)
      }
  }
})

console.log(answer.join('\n'))
