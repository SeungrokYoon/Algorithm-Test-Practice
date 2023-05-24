const answer = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .slice(1)
  .map(solution)
  .join('\n')

function solution(s) {
  const strArr = s.split('')
  const stack = []

  strArr.forEach((paren) => {
    if (paren === ')') {
      if (stack.length && stack[stack.length - 1] === '(') {
        stack.pop()
      } else {
        stack.push(paren)
      }
    } else {
      stack.push(paren)
    }
  })

  const isVPS = !stack.length ? 'YES' : 'NO'
  return isVPS
}

console.log(answer)
