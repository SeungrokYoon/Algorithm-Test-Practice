const [n, ...targetArr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)
const answerStr = targetArr.join('')
const answer = []
const resultNum = []

const candidateNumberArr = new Array(n).fill(0).map((_, i) => i + 1)
const stack = []
while (candidateNumberArr.length || stack.length) {
  if (candidateNumberArr.length) {
    if (stack.length === 0) {
      const nextNum = candidateNumberArr.shift()
      stack.push(nextNum)
      answer.push('+')
    } else {
      const top = stack[stack.length - 1]
      if (top === targetArr[0]) {
        const popped = stack.pop()
        answer.push('-')
        resultNum.push(popped)
        targetArr.shift()
      } else {
        const nextNum = candidateNumberArr.shift()
        stack.push(nextNum)
        answer.push('+')
      }
    }
  } else {
    while (stack.length) {
      const nextNum = stack.pop()
      answer.push('-')
      resultNum.push(nextNum)
    }
  }
}

if (resultNum.join('') === answerStr) {
  console.log(answer.join('\n'))
} else {
  console.log('NO')
}
