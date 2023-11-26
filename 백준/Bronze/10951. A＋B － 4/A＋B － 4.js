const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

console.log(
  input
    .reduce((acc, [a, b]) => {
      acc.push(a + b)
      return acc
    }, [])
    .join('\n'),
)
