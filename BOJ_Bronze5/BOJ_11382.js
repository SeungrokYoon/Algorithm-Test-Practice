const sum = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .reduce((prev, curr) => prev + parseInt(curr), 0)

console.log(sum)
