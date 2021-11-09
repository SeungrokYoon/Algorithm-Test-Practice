
// 백준1012 - 유기농 배추
//링크:https://www.acmicpc.net/problem/1012


const input = []
let howManytimes = 0;
let totalCount = 0 ;

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', function (line) {
  input.push(line)
}).on('close', function () {
  howManytimes = parseInt(input.shift())
  // 총 횟수에서
  for (let i = 0; i < howManytimes; i++) {
    totalCount = 0
    const [M , N, totalCabbage] = input.shift().split(' ').map((el)=>Number(el))
    const graph = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));
    // [ for i in 5 [] ]
    // Object + { l }
    // 초기 그래프 작성
    // const graph = []
    // for (let n =0; n< N; n++){
    //   graph.push(Array(M).fill(0))
    // }
    for (let cabbage =0; cabbage < totalCabbage; cabbage++){
      const [y, x] = input.shift().split(' ').map((el)=>Number(el))
      graph[x][y] = 1
    }
    for (let i =0; i< N; i++){
      for (let j =0; j<M; j++){
        if (graph[i][j]===1){
          dfs(i,j,graph, N , M)
          totalCount += 1
        }
      }
    }
    console.log(totalCount)
  }
  process.exit()
})

const dfs = (x, y, graph, N , M) => {
  const dx = [0, 1, -1, 0]
  const dy = [1, 0, 0, -1]
  const stack = []
  stack.push([x, y])
  graph[x][y] = 0
  while (stack.length) {
    const [x, y] = stack.pop()
    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i]
      const nextY = y + dy[i]
      if (!validateLocation(nextX, nextY ,N ,M)) {
        continue
      }
      if (graph[nextX][nextY] === 1 ) {
        graph[nextX][nextY] = 0
        stack.push([nextX, nextY])
      }
    }
  }
}

const validateLocation = (x, y, N, M) => {
  if (x >= 0 && x < N && y >= 0 && y < M) {
    return true
  }
  return false
}
