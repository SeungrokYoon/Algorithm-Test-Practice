const rotateKey = (key) => {
  const M = key.length
  const newKey = Array.from({ length: M }, () => Array.from({ length: M }, () => 0))
  for (let i = M - 1; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      newKey[j][M - 1 - i] = key[i][j]
    }
  }
  return newKey
}

const copyAggregationGraph = (originalAggregationGraph) => {
  const size = originalAggregationGraph.length
  const copied = Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      copied[i][j] = originalAggregationGraph[i][j]
    }
  }
  return copied
}

function solution(key, lock) {
  let answer = false
  const M = key.length
  const N = lock.length
  const arregationSize = N + 2 * (M - 1)
  const aggregationGraph = Array.from({ length: arregationSize }, () =>
    Array.from({ length: arregationSize }, () => 0),
  )
  //맨 중앙에 lock을 복사해 넣기
  for (let i = M - 1; i < N + M - 1; i++) {
    for (let j = M - 1; j < N + M - 1; j++) {
      const lockX = i - (M - 1)
      const lockY = j - (M - 1)
      aggregationGraph[i][j] = lock[lockX][lockY]
    }
  }
  let rotatedKey = rotateKey(key)
  for (let rotate = 0; rotate < 4; rotate++) {
    //총 회전 네 번
    for (let i = 0; i < N + M - 1; i++) {
      for (let j = 0; j < N + M - 1; j++) {
        //aggregationGraph 복사하여 사용하기
        const copiedAggregationGraph = copyAggregationGraph(aggregationGraph)
        //aggregationGraph상의 좌표인 i,j를 시작점으로 삼고,key의 값을 더하면서 채우기
        for (let x = i; x < i + M; x++) {
          for (let y = j; y < j + M; y++) {
            const keyX = x - i
            const keyY = y - j
            copiedAggregationGraph[x][y] += rotatedKey[keyX][keyY]
          }
        }
        // 합쳐진 copiedAggregationGraph 확인
        // let str = ''
        // copiedAggregationGraph.forEach((row) => {
        //   str += row.join(' ') + '\n'
        // })
        // console.log(str)
        //채우고 나서는 lock부분좌포들의 합이 모두 1인지 확인하기
        let allOne = true
        for (let i = M - 1; i < M - 1 + N; i++) {
          for (let j = M - 1; j < M - 1 + N; j++) {
            if (copiedAggregationGraph[i][j] !== 1) {
              allOne = false
              break
            }
          }
        }
        //만약 모두 1인 경우를 만족하면 열쇠가 자물쇠를 열 수 있는 경우임
        if (allOne) answer = true
      }
    }
    //키 회전시켜주기
    rotatedKey = rotateKey(rotatedKey)
  }

  return answer
}

//테스트
const key = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 1],
]
const lock = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
]
console.log(solution(key, lock))
