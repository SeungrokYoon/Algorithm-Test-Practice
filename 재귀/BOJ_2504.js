const fs = require('fs')
// const arr = fs.readFileSync('/dev/stdin').toString().split(' ')
const arr = fs
  .readFileSync(__dirname + '/text.txt')
  .toString()
  .split(' ')

const solution = (arr) => {
  let answer = 0
  const findCorrectParenthesis = (arr) => {
    const parenthesis = arr.join('')
    if (arr[0] === ']' || arr[0] === ')') return 0
    if (parenthesis === '[]') return 3
    if (parenthesis === '()') return 2
    //덩어리 찾기
    let subArr = []
    subArr.push(arr[0])
    while (subArr.length) {
      for (let i = 1; i < arr.length; i++) {
        const popped = subArr.pop()
        if (popped === '[' && arr[i] === ']') {
        }
      }
    }
  }
}
