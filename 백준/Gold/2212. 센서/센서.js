const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const SENSORS = +input[0]
const CENTER = +input[1]
const answer = input[2]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)
  .reduce((acc, curr, i, arr) => {
    if (i === 0) return acc
    const last = arr[i - 1]
    acc.push(curr - last)
    return acc
  }, [])
  .sort((a, b) => a - b)
  .slice(0, SENSORS - CENTER)
  .reduce((a, b) => a + b, 0)

console.log(answer)
