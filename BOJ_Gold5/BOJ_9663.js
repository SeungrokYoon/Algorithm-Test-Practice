const N =
  require('fs')
    .readFileSync(__dirname + '/test.txt')
    .toString()
    .trim() * 1

const solution = (N) => {
  let answer = 0
  const findNext = (tempGraph, currentRow, currentCol, counter) => {
    if (counter === N) {
      answer++
      return
    }
    //findNext가 끝나고 방문처리했던 그래프를 원상복귀 시켜주기 위해 그래프를 저장하기.
    //갈 수 없는 곳을 방문처리 해놓기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (
          currentRow === i ||
          currentCol === j ||
          Math.abs(currentRow - i) === Math.abs(currentCol - j)
        ) {
          tempGraph[i][j] = 1
        }
      }
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (tempGraph[i][j] === 1) continue
        //직선도, 대각선도 아닌 곳
        tempGraph[i][j] = 2
        findNext(tempGraph, i, j, counter + 1)
        tempGraph[i][j] = 0
        //findNext에서 방문처리 했던 이전상태로 돌려놓음
      }
    }
    //currentRow, currentCol 에 따라서 방문처리 해 줬던 곳을 미방문 처리 해주고 끝내기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (
          (currentRow === i ||
            currentCol === j ||
            Math.abs(currentRow - i) === Math.abs(currentCol - j)) &&
          tempGraph[i][j] === 1
        ) {
          tempGraph[i][j] = 0
        }
      }
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let graph = Array.from({ length: N }, () => Array.from({ length: N }, () => 0))
      graph[i][j] = 2
      findNext(graph, i, j, 1)
    }
  }

  return answer
}

console.log(solution(N))
