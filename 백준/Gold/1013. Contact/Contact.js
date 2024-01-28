const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const solution = (l) => {
  const regex = new RegExp('^(10[0]+[1]+|01)+$', 'g')
  return regex.test(l) ? 'YES' : 'NO'
}

console.log(
  input
    .slice(1)
    .map((l) => solution(l))
    .join('\n'),
)
