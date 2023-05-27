const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const n = input.shift()

const solution = (n, input) => {
  let currentNum = 1
  let resultStr = ''
  const stack = []
  let inputPointer = 0
  while (currentNum < n + 1) {
    let stop = false
    stack.push(currentNum)
    resultStr += '+\n'
    while (!stop && stack.length) {
      if (stack[stack.length - 1] === input[inputPointer]) {
        stack.pop()
        resultStr += '-\n'
        inputPointer++
      } else {
        stop = true
      }
    }
    currentNum++
  }
  if (stack.length > 0) return 'NO'
  return resultStr
}

console.log(solution(n, input))
