const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

input.length === 0 ? console.log(0) : console.log(input.split(' ').length)
