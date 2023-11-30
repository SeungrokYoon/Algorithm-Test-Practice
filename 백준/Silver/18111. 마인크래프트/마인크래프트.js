const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M, DEFAULT_INVENTORY] = input[0].split(' ').map(Number)
const map = input.slice(1).map((s) => s.split(' ').map(Number))

let lowest = 257
let highest = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    lowest = Math.min(lowest, map[i][j])
    highest = Math.max(highest, map[i][j])
  }
}

const iterateMapAndCollectAllRedundantBlocks = (map, target, defaultInventory) => {
  let inventory = defaultInventory
  let timeForMovingBlocksToInventory = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] > target) {
        inventory += map[i][j] - target
        timeForMovingBlocksToInventory += 2 * (map[i][j] - target)
      }
    }
  }
  return { inventory, timeForMovingBlocksToInventory }
}

const getBlocksToBeFilled = (map, target) => {
  let blocksToBeFilled = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] < target) blocksToBeFilled += target - map[i][j]
    }
  }
  return blocksToBeFilled
}

const isPossibleToFillNeeded = (inventory, blocksNeeded) => inventory >= blocksNeeded

const answer = []
for (let targetHeight = lowest; targetHeight < highest + 1; targetHeight++) {
  const { inventory, timeForMovingBlocksToInventory } = iterateMapAndCollectAllRedundantBlocks(
    map,
    targetHeight,
    DEFAULT_INVENTORY,
  )
  const blocksToBeFilled = getBlocksToBeFilled(map, targetHeight)
  if (blocksToBeFilled === 0) {
    answer.push([timeForMovingBlocksToInventory, targetHeight])
  } else if (isPossibleToFillNeeded(inventory, blocksToBeFilled)) {
    answer.push([timeForMovingBlocksToInventory + blocksToBeFilled, targetHeight])
  }
}

console.log(answer.sort((a, b) => a[0] - b[0] || b[1] - a[1])[0].join(' '))

// 2 4 0
// 0 0 0 0
// 2 2 2 2

// 정답 : 12 1
// 출력 : 16 0
