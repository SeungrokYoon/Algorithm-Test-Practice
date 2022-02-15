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
  let nIncludingStart = 0
  let nIncludingEnd = 0
  let nIncludingBoth = 0

  for (let planet = 0; planet < n; planet++) {
    planets.push(input.shift().split(' ').map(Number))
  }

  //출발점을 포함하는 행성계 개수 + 도착점을 포함하는 행성계 개수 - 2*공통 행성계 개수
  const isInPlanet = (px, py, cx, cy, r) => {
    return cx - r < px && px < cx + r && cy - r < py && py < cy + r
  }

  for (const planet of planets) {
    const [cx, cy, r] = planet
    const includesStart = isInPlanet(x1, y1, cx, cy, r)
    const includesEnd = isInPlanet(x2, y2, cx, cy, r)
    if (includesStart && includesEnd) {
      nIncludingBoth++
    } else if (includesStart && !includesEnd) {
      nIncludingStart++
    } else if (!includesStart && includesEnd) {
      nIncludingEnd++
    }
  }
  console.log(nIncludingStart + nIncludingEnd - 2 * nIncludingBoth)
}
