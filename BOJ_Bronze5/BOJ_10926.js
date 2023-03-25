const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : '/test/test.txt')
  .toString()
  .trim()

console.log(input + '??!')
