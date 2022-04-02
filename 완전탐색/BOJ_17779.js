const [[N], ...map] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

let answer = 400 * 100

const solution = () => {
  for (let d1 = 1; d1 < N; d1++) {
    for (let d2 = 1; d2 < N; d2++) {
      for (let x = 0; x + d1 + d2 < N; x++) {
        for (let y = 0; y + d2 < N; y++) {
          if (y - d1 < 0) continue
          const regions = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
              calculateRegions(i, j, x, y, d1, d2, regions)
            }
          }
          //regions의 최소 최대값의 차이를 구하면 된다.
          const values = Object.values(regions)
          const diff = Math.max(...values) - Math.min(...values)
          answer = Math.min(answer, diff)
        }
      }
    }
  }
}

const calculateRegions = (row, col, x, y, d1, d2, regions) => {
  const [upX, upY] = [x, y]
  const [leftX, leftY] = [x + d1, y - d1]
  const [rightX, rightY] = [x + d2, y + d2]
  const [downX, downY] = [x + d1 + d2, y - d1 + d2]
  //district1
  if (row < leftX && col <= upY) {
    //district5
    if ((leftX - row) / (col - leftY) <= 1 && (leftX - row) / (col - leftY) > 0) {
      regions[5] += map[row][col]
      return
    }
    //district1
    regions[1] += map[row][col]
    return
  }

  //district2
  if (row <= rightX && upY < col) {
    //district5
    if ((row - upX) / (col - upY) >= 1) {
      regions[5] += map[row][col]
      return
    }
    //district2
    regions[2] += map[row][col]
    return
  }

  //district3
  if (leftX <= row && col < downY) {
    //district5
    if ((downX - row) / (downY - col) >= 1) {
      regions[5] += map[row][col]
      return
    }
    //district3
    regions[3] += map[row][col]
    return
  }
  //district4
  if (rightX < row && downY <= col) {
    //district5
    if ((row - rightX) / (rightY - col) <= 1 && (row - rightX) / (rightY - col) > 0) {
      regions[5] += map[row][col]
      return
    }
    //district4
    regions[4] += map[row][col]
    return
  }
  //맨 가운데 경계 안의 부분
  regions[5] += map[row][col]
}
solution()
console.log(answer)
