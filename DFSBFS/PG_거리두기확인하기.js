const checkManhatan = (place) => {
  const people = []
  //사람 위치 찾기
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      if (place[row][column] === 'P') people.push({ row, column })
    }
  }

  const dRow = [0, 0, 1, -1]
  const dCol = [1, -1, 0, 0]
  for (const person of people) {
    const graph = []
    place.forEach((row) => graph.push([...row.split('')]))
    //각 사람 위치에서 dfs를 통해서 맨하탄 거리를 찾아보기
    const { row, column } = person
    const queue = []
    queue.push({ row, column })
    graph[row][column] = 0
    while (queue.length) {
      const popped = queue.shift()
      const x = popped.row
      const y = popped.column
      for (let i = 0; i < 4; i++) {
        const nx = x + dRow[i]
        const ny = y + dCol[i]
        if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue
        if (graph[nx][ny] === 'O') {
          queue.push({ row: nx, column: ny })
          graph[nx][ny] = graph[x][y] + 1
        }
        if (graph[nx][ny] === 'P') {
          graph[nx][ny] = graph[x][y] + 1
          if (Math.abs(nx - row) + Math.abs(ny - column) <= 2 && graph[x][ny] <= 2) {
            return 0
          }
          graph[nx][ny] === graph[x][y] + 1
        }
      }
    }
  }

  return 1
}

function solution(places) {
  //각 사람마다 DFS해서 맨해튼 거리를 2를 한 명이라도 안 지키면 return false
  const answer = places.map((place) => checkManhatan(place))
  return answer
}
