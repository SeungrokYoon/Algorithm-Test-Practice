const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const map = inputArr
  .reduce((acc, curr) => {
    return acc * curr
  }, 1)
  .toString()
  .split('')
  .reduce((acc, curr) => {
    acc.has(+curr) ? acc.set(+curr, acc.get(+curr) + 1) : acc.set(+curr, 1)
    return acc
  }, new Map())

const answer = []
for (let i = 0; i < 10; i++) {
  answer.push(map.has(i) ? map.get(i) : 0)
}

console.log(answer.join('\n'))
