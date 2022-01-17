const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map((i) => +i))

const [n, m] = input.shift()
const graph = input

const getAChickenDistance = (n, subSet, home) => {
  let totalDistance = 0
  home.forEach((location) => {
    let minDistance = 100
    const [home_x, home_y] = location
    subSet.forEach((chicken) => {
      const [chicken_x, chicken_y] = chicken
      const chickenDistance = Math.abs(chicken_x - home_x) + Math.abs(chicken_y - home_y)
      if (minDistance > chickenDistance) minDistance = chickenDistance
    })
    totalDistance += minDistance
  })
  return totalDistance
}

const solution = (n, m, graph) => {
  let minDistance = []
  const bbq = []
  const home = []
  let id = 0
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (graph[y][x] === 2) {
        bbq.push([x, y])
        id++
      } else if (graph[y][x] === 1) home.push([x, y])
    }
  }

  //1~ M개만큼 치킨집 살려야 함
  //살리는 조합 찾기 with 비트 마스킹
  for (let count = 0; count < 2 ** bbq.length; count++) {
    const subSet = []
    for (let j = 0; j < bbq.length; j++) {
      if (count & (1 << j)) {
        subSet.push(bbq[j])
      }
    }
    if (subSet.length <= m) {
      const chickenDistance = getAChickenDistance(n, subSet, home)
      minDistance.push(chickenDistance)
    }
  }
  return Math.min(...minDistance)
}

console.log(solution(n, m, graph))
