const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(/\s+/g)
  .slice(1)
  .flatMap((line) => line.split('').reverse().join('').split(' ').map(Number))
  .sort((a, b) => a - b)

console.log(input.join('\n'))
