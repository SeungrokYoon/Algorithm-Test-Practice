function solution(n, paths, gates, summits) {
  var answer = []
  const adjMap = {}
  const nodes = {}
  gates.forEach((gate) => {
    nodes[gate] = { isSummit: false, isGate: true }
  })
  summits.forEach((summit) => {
    nodes[summit] = { isSummit: true, isGate: false }
  })
  paths.forEach((path) => {
    const [start, end, weight] = path
    start in adjMap ? adjMap[start].push([end, weight]) : (adjMap[start] = [end, weight])
    end in adjMap ? adjMap[end].push([start, weight]) : (adjMap[end] = [start, weight])
    if (!(start in nodes)) {
      nodes[start] = { isSummit: false, isGate: false }
    }
    if (!(end in nodes)) {
      nodes[end] = { isSummit: false, isGate: false }
    }
  })
  console.log(nodes)
  const nNodes = Object.keys(nodes).length
  const graph = Array.from({ length: nNodes + 1 }, (_, i) =>
    Array.from({ length: nNodes + 1 }, (_, j) => (i === j ? 0 : Infinity)),
  )
  paths.forEach((path) => {
    const [start, end, weight] = path
    adjMap[start][end] = weight
    adjMap[end][start] = weight
  })

  for (let m = 1; m < nNodes + 1; m++) {
    for (let s = 1; s < nNodes + 1; s++) {
      for (let e = 1; e < nNodes + 1; e++) {
        //여기서 걸러보기
        //오로지 게이트에서 출발해서 산봉우리여야함 intensity는 그 값의 2배를 하면 된다. 왕복이니까
        if (nodes[s].isGate) {
          if (
            (!nodes[m].isGate && !nodes[m].isSummit && nodes[e].isSummit) ||
            (!nodes[m].isGate && !nodes[m].isSummit && !nodes[e].isSummit)
          ) {
            graph[s][e] = Math.min(graph[s][e], graph[s][m] + graph[m][e])
          }
        } else if (nodes[s].isSummit) {
          if (!nodes[m].isSummit && !nodes[e].isSummit) {
            graph[s][e] = Math.min(graph[s][e], graph[s][m] + graph[m][e])
          }
        } else {
          if (!nodes[m].isGate && !nodes[m].isGate) {
            graph[s][e] = Math.min(graph[s][e], graph[s][m] + graph[m][e])
          }
        }
      }
    }
  }
  console.log(graph)
  return answer
}
