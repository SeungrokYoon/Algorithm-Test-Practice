const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = input[0] * 1
const arr = input[1].split(' ').map(Number)
let lowerBound = 100001
const findLowerBound = (left, right, arr, toFind) => {
  if (left > right) {
    return
  }
  const mid = Math.floor((right + left) / 2)
  if (arr[mid] < toFind) {
    findLowerBound(mid + 1, right, arr, toFind)
    return
  }
  lowerBound = Math.min(lowerBound, mid)
  findLowerBound(left, mid - 1, arr, toFind)
}

const dp = []
for (let n of arr) {
  if (dp.length === 0 || dp[dp.length - 1] < n) {
    dp.push(n)
  } else {
    lowerBound = 100001
    findLowerBound(0, dp.length - 1, dp, n)
    dp[lowerBound] = n
  }
}

console.log(Math.min(arr.length - dp.length))
