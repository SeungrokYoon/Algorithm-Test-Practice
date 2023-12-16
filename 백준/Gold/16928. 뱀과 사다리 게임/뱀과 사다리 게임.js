const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const SIZE = 100
const [N, M] = input[0].split(' ').map(Number)
const ladders = input.slice(1, 1 + N).map((l) => l.split(' ').map(Number))
const snakes = input.slice(1 + N).map((l) => l.split(' ').map(Number))
const map = Array.from({ length: SIZE + 1 }, (_, i) => i)
ladders.forEach(([s, d]) => (map[s] = d))
snakes.forEach(([s, d]) => (map[s] = d))

const distanceTable = Array.from({ length: SIZE + 1 }, () => SIZE)
distanceTable[1] = 0

const dfs = (currentIndex, count, target) => {
  distanceTable[currentIndex] = Math.min(count, distanceTable[currentIndex])
  if (map[currentIndex] < currentIndex) {
    if (distanceTable[map[currentIndex]] < distanceTable[currentIndex]) return
    dfs(map[currentIndex], distanceTable[currentIndex], target)
  } else if (map[currentIndex] > currentIndex) {
    //사다리
    if (distanceTable[map[currentIndex]] < distanceTable[currentIndex]) return
    dfs(map[currentIndex], distanceTable[currentIndex], target)
  } else {
    for (let dice = 1; dice <= 6; dice++) {
      if (
        currentIndex + dice > target ||
        distanceTable[currentIndex + dice] <= distanceTable[currentIndex] + 1
      )
        continue
      dfs(currentIndex + dice, distanceTable[currentIndex] + 1, target)
    }
  }
}

dfs(1, distanceTable[1], SIZE)

console.log(distanceTable[SIZE])
