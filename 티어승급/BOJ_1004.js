const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const T = input.shift() * 1

for (let i = 0; i < T; i++) {
  const [x1, y1, x2, y2] = input.shift().split(' ').map(Number)
  const n = input.shift() * 1
  const planets = []
  let count = 0

  for (let planet = 0; planet < n; planet++) {
    planets.push(input.shift().split(' ').map(Number))
  }

  //출발점을 포함하는 행성계 개수 + 도착점을 포함하는 행성계 개수 - 2*공통 행성계 개수
  const isInPlanet = (px, py, cx, cy, r) => {
    //해당 점이 원의 바깥에 있는지 없는지는 원의 중심과 점 사이의 거리를 구하면된다
    return (px - cx) * (px - cx) + (py - cy) * (py - cy) < r * r
  }

  for (const planet of planets) {
    const [cx, cy, r] = planet
    const includesStart = isInPlanet(x1, y1, cx, cy, r)
    const includesEnd = isInPlanet(x2, y2, cx, cy, r)
    if (includesStart) count++
    if (includesEnd) count++
    if (includesStart && includesEnd) count -= 2
  }
  console.log(count)
}
