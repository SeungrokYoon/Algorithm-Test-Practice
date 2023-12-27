const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const stack = []

for (let i = 0; i < input.length; i++) {
  if (stack.length >= 3) {
    const ch3 = stack.pop()
    const ch2 = stack.pop()
    const ch1 = stack.pop()
    if (ch1 + ch2 + ch3 + input[i] === 'PPAP') {
      stack.push('P')
    } else {
      stack.push(ch1)
      stack.push(ch2)
      stack.push(ch3)
      stack.push(input[i])
    }
  } else {
    stack.push(input[i])
  }
}

console.log(stack.length === 1 && stack[0] === 'P' ? 'PPAP' : 'NP')
