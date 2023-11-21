const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const answer =
  inputArr.reduce((acc, curr) => {
    return acc + curr ** 2
  }, 0) % 10

console.log(answer)