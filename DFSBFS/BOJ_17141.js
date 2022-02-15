const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const viruses = []
//그래프를 순회하며 바이러스 위치를 뽑고, 원래 바이러스 위치의 값은 -1으로 만들어주기
//벽은 -2 빈칸은 -1 바이러스가있던 곳도 -1
const graph = input.map((str, row) =>
  str.split(' ').map((num, col) => {
    if (num * 1 === 2) {
      viruses.push([row, col])
      return -1
    } else if (num * 1 === 0) return -1
    return -2
  }),
)

const solution = () => {
  let answer = []
  const dRow = [1, -1, 0, 0]
  const dCol = [0, 0, 1, -1]
  //바이러스 위치 조합 찾기
  const pickCombis = getCombi(viruses, M)
  for (const pickCombi of pickCombis) {
    const tempGraph = []
    graph.forEach((row) => tempGraph.push([...row]))
    //그래프에 바이러스 위치시킴
    for (const pick of pickCombi) {
      tempGraph[pick[0]][pick[1]] = 0
    }
    //이후 각 좌표를 순회하며 바이러스가 있는 곳(0인 부분)부터 BFS 진행
    //큐 초기값
    const queue = []
    pickCombi.forEach((combi) => {
      queue.push(combi)
    })
    //큐에 넣고 BFS돌기
    while (queue.length) {
      const [row, col] = queue.shift()
      for (let i = 0; i < 4; i++) {
        const nextRow = row + dRow[i]
        const nextCol = col + dCol[i]
        if (
          0 <= nextRow &&
          nextRow < N &&
          0 <= nextCol &&
          nextCol < N &&
          tempGraph[nextRow][nextCol] === -1
        ) {
          //처음 접근하는 위치
          tempGraph[nextRow][nextCol] = tempGraph[row][col] + 1
          queue.push([nextRow, nextCol])
        }
      }
    }

    //-1의 개수가 존재하는지 파악(빈칸). -1이존재하지 않는다면 최대값 리턴하고, answer와 최소값
    let isComplete = true
    let tempMax = 0
    tempGraph.forEach((row) => {
      tempMax = Math.max(Math.max(...row), tempMax)
      row.forEach((num) => {
        if (num === -1) isComplete = false
      })
    })
    if (isComplete) answer.push(tempMax)
  }
  const result = answer.length ? Math.min(...answer) : -1
  return result
}

const getCombi = (arr, selectNumber) => {
  const results = []
  if (selectNumber === 1) return arr.map((el) => [el])
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1)
    const combinations = getCombi(rest, selectNumber - 1)
    const attached = combinations.map((el) => [fixed, ...el])
    results.push(...attached)
  })
  return results
}

console.log(solution())
