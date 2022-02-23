const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()

const solution = () => {
  const stack = []
  for (let i = 0; i < input.length; i++) {
    const current = input[i]
    if (i < input.length - 1 && input[i + 1] === '(') {
      stack.push(input[i] * 1)
    } else if (current === '(') {
      stack.push(Number.MAX_SAFE_INTEGER)
    } else if (current === ')') {
      let tempSum = 0
      while (stack[stack.length - 1] !== Number.MAX_SAFE_INTEGER) {
        tempSum += stack.pop()
      }
      stack.pop()
      const multi = stack.pop()
      stack.push(tempSum * multi)
    } else {
      stack.push(1)
    }
  }
  return stack.reduce((prev, current) => prev + current, 0)
}
console.log(solution())
