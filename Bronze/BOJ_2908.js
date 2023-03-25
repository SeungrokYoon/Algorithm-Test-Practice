const [first, second] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')

console.log(
  Math.max(
    parseInt(first.split('').reverse().join('')),
    parseInt(second.split('').reverse().join('')),
  ),
)
