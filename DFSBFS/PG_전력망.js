function solution(n, wires) {
  let answer = n
  for (let tobeRemoved = 0; tobeRemoved < wires.length; tobeRemoved++) {
    const newWires = [...wires.slice(0, tobeRemoved), ...wires.slice(tobeRemoved + 1)]
    //인접리스트로 그래프 작성
    const graph = new Array(n + 1).fill(0).map((i) => [])
    for (const connection of newWires) {
      const [from, to] = connection
      graph[from].push(to)
      graph[to].push(from)
    }
    //BFS로 계산.
    const visited = new Array(n + 1).fill(0)
    const queue = []
    queue.push(newWires[0][0])
    visited[newWires[0][0]] = 1
    let count = 1
    while (queue.length) {
      const from = queue.shift()
      for (const to of graph[from]) {
        if (visited[to] === 0) {
          count++
          visited[to] = 1
          queue.push(to)
        }
      }
    }
    answer = Math.min(Math.max(count, n - count) - Math.min(count, n - count), answer)
  }

  return answer
}
