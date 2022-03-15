function solution(width, height, diagonals) {
  var answer = 0
  for (let i = 0; i < diagonals.length; i++) {
    const [column, row] = diagonals[i]
    let currentArr = Array.from({ length: width + 1 }, () => 1)
    let deltaArr = Array.from({ length: width + 1 }, () => 1)
    for (let i = 1; i < height + 1; i++) {
      for (let j = 1; j < width + 1; j++) {
        if (row === i && column === j) {
          currentArr[j] = (currentArr[j - 1] + deltaArr[j]) % 10000019
        } else {
          currentArr[j] = (currentArr[j - 1] + deltaArr[j]) % 10000019
        }
      }
      deltaArr = [...currentArr]
      currentArr = Array.from({ length: width + 1 }, () => 1)
    }
    answer += deltaArr[deltaArr.length - 1]
  }

  return answer
}
console.log(
  solution(2, 2, [
    [1, 1],
    [2, 2],
  ]),
)
console.log(solution(51, 37, [[17, 19]]))
