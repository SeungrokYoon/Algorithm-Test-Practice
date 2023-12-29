const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const answer = []
for (let i = 1; i < input.length; i += 2) {
  const LEN = +input[i]
  const arr = [0].concat(input[i + 1].split(' ').map(Number))
  const visited = Array(LEN + 1).fill(0)
  let cycle = 0
  for (let v = 1; v <= LEN; v++) {
    if (visited[v]) continue
    cycle++
    let currVertex = v
    while (visited[currVertex] === 0) {
      visited[currVertex] = 1
      currVertex = arr[currVertex]
    }
  }
  answer.push(cycle)
}

console.log(answer.join('\n'))
