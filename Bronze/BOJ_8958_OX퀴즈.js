const [N, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const solution = (line) => {
  let counter = 0
  const answer = line.split('').reduce((acc, curr) => {
    const score = curr === 'O' ? ++counter : (counter = 0)
    return acc + score
  }, 0)
  return answer
}

const answer = input.map((line) => solution(line)).join('\n')
console.log(answer)
