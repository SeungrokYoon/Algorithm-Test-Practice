const platform = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
const inputArr = require('fs').readFileSync(platform).toString().trim().split('\n')
inputArr.pop()

function getAnswerText(a, b, c, answer) {
  return `w(${a}, ${b}, ${c}) = ${answer}`
}

const dpMap = Array.from({ length: 21 }, () => []).map((a) =>
  Array.from({ length: 21 }, () => []).map((b) => Array.from({ length: 21 }, () => 0)),
)

function recursion(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return 1
  else if (a > 20 || b > 20 || c > 20) return recursion(20, 20, 20)
  else if (dpMap[a][b][c] != 0) return dpMap[a][b][c]
  else if (a < b && b < c)
    dpMap[a][b][c] = recursion(a, b, c - 1) + recursion(a, b - 1, c - 1) - recursion(a, b - 1, c)
  else
    dpMap[a][b][c] =
      recursion(a - 1, b, c) +
      recursion(a - 1, b - 1, c) +
      recursion(a - 1, b, c - 1) -
      recursion(a - 1, b - 1, c - 1)

  return dpMap[a][b][c]
}

const answer = inputArr
  .map((line) => {
    const [a, b, c] = line.split(' ').map(Number)
    const calVal = recursion(a, b, c)
    return getAnswerText(a, b, c, calVal)
  })
  .join('\n')

console.log(answer)
