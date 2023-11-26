const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const genLines = (n, line) => {
  return `${n} * ${line} = ${n * line}`
}

const solution = (n) => {
  const answer = []
  for (let i = 1; i < 10; i++) {
    answer.push(genLines(n, i))
  }
  return answer.join('\n')
}

console.log(solution(+input))
