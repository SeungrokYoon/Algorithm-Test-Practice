const inputArr = require('fs').readFileSync('test/test.txt').toString().trim().split('')

const given = { 'c=': 1, 'c-': 1, 'dz=': 1, 'd-': 1, lj: 1, nj: 1, 's=': 1, 'z=': 1 }
const stack = []
let answer = 0

let i = 0
while (i < inputArr.length) {
  const currentChar = inputArr[i]
  const justPush = !'=-j'.includes(currentChar) || stack.length === 0
  if (justPush) {
    stack.push(currentChar)
    i++
    continue
  }

  //검사
  const top = stack.pop()
  const word = top + currentChar
  if (given[word]) {
    if (word === 'z=') {
      if (stack.length && stack[stack.length - 1] === 'd') {
        stack.pop()
      }
    }
    answer++
    while (stack.length) {
      stack.pop()
      answer++
    }
  } else {
    stack.push(top)
    stack.push(currentChar)
  }
  i++
}

console.log(answer + stack.length)
