const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const solution = () => {
  const N = input.shift()
  let num = 1
  let pointer = 0
  const stack = []
  let poppedResult = ''
  while (num < N + 1) {
    stack.push(num)
    poppedResult += '+\n'
    let stop = false
    while (!stop && stack.length > 0) {
      if (stack[stack.length - 1] === input[pointer]) {
        stack.pop()
        poppedResult += '-\n'
        pointer++
      } else {
        stop = true
      }
    }
    num++
  }
  if (stack.length > 0) return 'NO'
  return poppedResult
}

console.log(solution())
