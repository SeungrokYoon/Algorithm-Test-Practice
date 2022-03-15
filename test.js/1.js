function solution(n, clockwise) {
  const graph = Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
  const startRow = [0, 0, n - 1, n - 1]
  const startCol = [0, n - 1, n - 1, 0]
  const dRow = clockwise ? [0, 1, 0, -1] : [1, 0, -1, 0]
  const dCol = clockwise ? [1, 0, -1, 0] : [0, -1, 0, 1]

  const queue = []
  for (let i = 0; i < 4; i++) {
    const row = startRow[i]
    const col = startCol[i]
    graph[row][col] = 1
    queue.push({ row, col, deltaIndex: i })
  }
  while (queue.length) {
    const dequeued = queue.shift()
    const { row, col, deltaIndex } = dequeued
    let nextRow = row + dRow[deltaIndex]
    let nextCol = col + dCol[deltaIndex]
    if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n) {
      nextRow = row + dRow[clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4]
      nextCol = col + dCol[clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4]
      if (graph[nextRow][nextCol] === 0) {
        graph[nextRow][nextCol] = graph[row][col] + 1
        queue.push({
          row: nextRow,
          col: nextCol,
          deltaIndex: clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4,
        })
        continue
      }
    }
    nextRow = row + dRow[deltaIndex]
    nextCol = col + dCol[deltaIndex]
    if (graph[nextRow][nextCol] === 0) {
      graph[nextRow][nextCol] = graph[row][col] + 1
      queue.push({ row: nextRow, col: nextCol, deltaIndex })
    } else {
      nextRow = row + dRow[clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4]
      nextCol = col + dCol[clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4]
      if (graph[nextRow][nextCol] === 0) {
        graph[nextRow][nextCol] = graph[row][col] + 1
        queue.push({
          row: nextRow,
          col: nextCol,
          deltaIndex: clockwise ? (deltaIndex + 1) % 4 : (deltaIndex + 3) % 4,
        })
        continue
      }
    }
    console.log(dequeued, graph[row][col])
    console.log(graph)
    console.log(nextRow, nextCol)
  }
  return graph
}

console.log(solution(5, true))

console.log(solution(5, false))
