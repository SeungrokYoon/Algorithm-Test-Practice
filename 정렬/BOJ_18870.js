const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift() * 1
const arr = input[0].split(' ').map((i) => +i)

const newSet = new Set(arr)
const newArr = Array.from(newSet).sort((a, b) => a - b)
const answer = {}
newArr.forEach((num, index) => (answer[num] = index))
const answerArr = arr.map((num) => answer[num])
console.log(...answerArr)
