const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, TARGET] = input[0].split(' ').map(Number)
const directingArr = input.slice(1).map(Number)

const solution = (arr, targetN) => {
  let curr = 0
  let counter = 0
  const visited = Array.from({ length: N }, () => 0)
  while (visited[curr] === 0) {
    visited[curr] = 1
    if (curr === targetN) {
      return counter
    } else {
      counter++
      const nextPerson = arr[curr]
      curr = nextPerson
    }
  }
  return -1
}

console.log(solution(directingArr, TARGET))
