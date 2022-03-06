const N = require('fs').readFileSync('/dev/stdin').toString().trim() * 1
//n개의 줄에 n개의 퀸을 서로 간섭하지 않게 놓는 문제 -> 각 줄에 단 1개의 퀸이 존재하는 것이 보장됨 -> 2차원 배열 그래프를 굳이 사용하지 않아도 될 것 같은데...?
//n 번째 row 에 존재하는 퀸의 column 값만 저장하면 될듯...?
const solution = (N) => {
  let answer = 0
  const locationMemo = Array.from({ length: N }, () => -1)
  //인덱스 i가 row, locationMemo[i] = 퀸이 들어있는 column값 -> 좌표는 (i, locationMemo[i])
  const findNext = (row, count, N) => {
    //종료조건
    if (count === N) {
      answer++
      return
    }
    //해당 row 에 이미 퀸이 있으면(값이 -1이 아니면) 놓을 수 없는 row
    //row 는 자동으로 증가하며 퀸의 존재를 확인한다.

    //이전 row 까지 같은 번호의 column 이 하나라도 존재하면 놓을 수 없는 column ||
    //대각선에 퀸이 존재하는지 판단하는 로직
    //row를 돌면서 해당 row까지, 퀸 이 존재하면(무조건 존재함) Math.abs(x1-x2) === Math.abs(y1-y2) 확인
    for (let j = 0; j < N; j++) {
      //같은 컬럼이 한 번이라도 존재하거나, 대각선 경로에 존재하면 한 번이라도 걸리면 break
      let isValid = true
      for (let i = 0; i < row; i++) {
        if (locationMemo[i] === j || Math.abs(i - row) === Math.abs(locationMemo[i] - j)) {
          isValid = false
          break
        }
      }
      //아니라면 가능한 column index 인 j 이다.
      if (isValid) {
        locationMemo[row] = j
        findNext(row + 1, count + 1, N)
        locationMemo[row] = -1
      }
    }
  }
  for (let i = 0; i < N; i++) {
    locationMemo[0] = i
    findNext(1, 1, N)
    locationMemo[0] = -1
  }
  return answer
}

console.log(solution(N))
