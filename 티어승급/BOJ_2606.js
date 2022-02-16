const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = input.shift()
const M = input.shift()

const solution = (start) => {
  //인접그래프 작성
  const graph = Array.from({ length: N + 1 }, () => [])
  input.forEach((edge) => {
    const [from, to] = edge.split(' ').map(Number)
    graph[from].push(to)
    graph[to].push(from)
  })
  const visit = Array.from({ length: N + 1 }).fill(0)
  const stack = [start]
  visit[start] = 1
  let count = 0
  while (stack.length) {
    const from = stack.pop()
    for (const to of graph[from]) {
      if (!visit[to]) {
        visit[to] = 1
        stack.push(to)
        count++
      }
    }
  }
  return count
}

console.log(solution(1))
