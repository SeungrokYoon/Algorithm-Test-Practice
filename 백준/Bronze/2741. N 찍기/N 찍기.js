const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

console.log(Array.from({ length: +input }, (_, i) => i + 1).join('\n'))
