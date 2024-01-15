const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('')

const stack = []

for (let i = 0; i < input.length; i++) {
  if (stack.length === 0) {
    stack.push(input[i])
  } else {
    const top = stack[stack.length - 1]
    if (top === '(' && input[i] === ')') {
      stack.pop()
    } else {
      stack.push(input[i])
    }
  }
}

console.log(stack.length)
