const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const N = input.length
const tagQueue = []
const normalStrStack = []
let answer = ''

for (let i = 0; i < N; i++) {
  const currentChar = input[i]
  if (currentChar === '<') {
    tagQueue.push('<')
    //일반문자열 출력
    while (normalStrStack.length) {
      answer += normalStrStack.pop()
    }
  } else if (currentChar === '>') {
    tagQueue.push('>')
    while (tagQueue.length) {
      answer += tagQueue.shift()
    }
  } else {
    if (tagQueue.length) {
      tagQueue.push(currentChar)
    } else {
      if (currentChar === ' ') {
        while (normalStrStack.length) {
          answer += normalStrStack.pop()
        }
        answer += ' '
      } else {
        //일반문자열 추가
        normalStrStack.push(currentChar)
      }
    }
  }
}

while (normalStrStack.length) {
  answer += normalStrStack.pop()
}

console.log(answer)
