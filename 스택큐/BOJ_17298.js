const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const arr = input[0].split(' ').map(Number)

const solution = () => {
  const result = Array.from({ length: N }, () => -1)
  const stack = []
  for (let i = 0; i < N; i++) {
    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      const poppedIndex = stack.pop()
      result[poppedIndex] = arr[i]
    }
    stack.push(i)
  }
  return result.join(' ')
}
console.log(solution())
