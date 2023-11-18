const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const isQueue = (t) => t === 0
const initialData = input[2].split(' ').map(Number)
const initialQueue = input[1]
  .split(' ')
  .map(Number)
  .map((el, index) => [el, initialData[index]])
  .filter(([el]) => isQueue(el))
  .map((data) => data[1])
  .reverse()
const answerLength = +input[3]
const inputData = input[4].split(' ').map(Number)

const queue = initialQueue.concat(inputData)

console.log(queue.slice(0, answerLength).join(' '))
