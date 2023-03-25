const input =
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

console.log(input - 543)
