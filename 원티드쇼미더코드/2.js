const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const [N, Q] = input[0]
const houseNumbers = ['0'].concat(input[1])
const roadInfos = input.slice(2, N + 1)
const plays = input.slice(N + 1)
const adjList = Array.from({ length: N + 1 }, () => [])
for (const [from, to] of roadInfos) {
  adjList[from].push(to)
  adjList[to].push(from)
}

const solution = () => {
  let answer = ''
  for (const play of plays) {
    const [start, end] = play
    const visited = Array.from({ length: N + 1 }, () => false)
    const stack = []
    stack.push(start)
    stack.push(houseNumbers[start])
    visited[start] = true
    while (stack.length) {
      const strSofar = stack.pop()
      const poppedNodeNumber = stack.pop()
      if (poppedNodeNumber === end) {
        answer += `${BigInt(strSofar) % 1000000007n}\n`
        break
      }
      for (const node of adjList[poppedNodeNumber]) {
        if (visited[node]) continue
        stack.push(node)
        stack.push(`${strSofar}${houseNumbers[node]}`)
        visited[node] = true
      }
    }
  }
  return answer
}

const result = solution()
console.log(result.trim())
