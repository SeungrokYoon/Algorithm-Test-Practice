const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const arr = input[1].split(' ').map(Number)
console.log(`${Math.min(...arr)} ${Math.max(...arr)}`)
