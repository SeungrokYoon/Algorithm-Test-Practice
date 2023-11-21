const hex = parseInt(
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim()
    .split(' '),
  16,
)
console.log(hex)
