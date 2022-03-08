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

const lisArr = []
for (let n of arr) {
  if (lisArr.length === 0 || lisArr[lisArr.length - 1] < n) {
    lisArr.push(n)
  } else {
    lowerBound = 100001
    findLowerBound(0, lisArr.length - 1, lisArr, n)
    lisArr[lowerBound] = n
  }
}

console.log(Math.min(arr.length - lisArr.length))
