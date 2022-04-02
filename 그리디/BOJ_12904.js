const [S, T] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const stack = []
stack.push(T)
let answer = 0
while (stack.length) {
  const poppedStr = stack.pop()
  if (poppedStr.length === 0) continue
  let nextStr =
    poppedStr[poppedStr.length - 1] === 'A'
      ? poppedStr.slice(0, poppedStr.length - 1)
      : poppedStr
          .slice(0, poppedStr.length - 1)
          .split('')
          .reverse()
          .join('')
  if (nextStr === S) {
    answer = 1
    break
  }
  stack.push(nextStr)
}

console.log(answer)
