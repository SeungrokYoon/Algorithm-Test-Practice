//S4: 균형잡힌 세상 https://www.acmicpc.net/problem/4949

const answer = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(solution)
  .slice(0, -1)
  .join('\n')

function solution(s) {
  const strArr = s.split('')
  const stack = []
  const parenList = ['(', ')', '[', ']']

  const isPair = (paren, target) => {
    if ((paren === ')' && target === '(') || (paren === ']' && target === '[')) return true
    return false
  }

  strArr.forEach((char) => {
    if (char && parenList.includes(char)) {
      if (char === ')' || char === ']') {
        if (stack.length > 0 && isPair(char, stack[stack.length - 1])) {
          stack.pop()
        } else {
          stack.push(char)
        }
      } else {
        stack.push(char)
      }
    }
  })

  return stack.length === 0 ? 'yes' : 'no'
}

console.log(answer)
