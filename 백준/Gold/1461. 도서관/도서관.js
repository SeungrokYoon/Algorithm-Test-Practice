const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = input[0].split(' ').map(Number)

const sorted = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)

let left = 0
let right = sorted.length - 1
let totalDist = 0
if (Math.abs(sorted[left]) > Math.abs(sorted[right])) {
  totalDist += Math.abs(sorted[left])
  if (sorted[left] < 0) {
    let counter = 0
    while (counter < M) {
      if (sorted[left] > 0) break
      counter++
      left++
    }
  } else {
    left += M
  }
} else {
  totalDist += Math.abs(sorted[right])
  if (sorted[right] > 0) {
    let counter = 0
    while (counter < M) {
      if (sorted[right] < 0) break
      counter++
      right--
    }
  } else {
    right--
  }
}

while (left <= right) {
  if (Math.abs(sorted[left]) > Math.abs(sorted[right])) {
    totalDist += 2 * Math.abs(sorted[left])
    if (sorted[left] < 0) {
      let counter = 0
      while (counter < M) {
        if (sorted[left] > 0) break
        counter++
        left++
      }
    } else {
      left += M
    }
  } else {
    totalDist += 2 * Math.abs(sorted[right])
    if (sorted[right] > 0) {
      let counter = 0
      while (counter < M) {
        if (sorted[right] < 0) break
        counter++
        right--
      }
    } else {
      right--
    }
  }
}

console.log(totalDist)
