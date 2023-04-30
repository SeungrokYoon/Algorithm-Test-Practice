const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))
const [N, K] = input.shift()

const inputArr = input[0]
let count = 0

const mergeSort = (arr, p, r) => {
  if (p >= r) return
  const q = Math.floor((p + r) / 2)
  mergeSort(arr, p, q)
  mergeSort(arr, q + 1, r)
  merge(arr, p, q, r)
}

const merge = (arr, p, q, r) => {
  let i = p
  let j = q + 1
  const temp = []
  while (i <= q && j <= r) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++])
    } else {
      temp.push(arr[j++])
    }
  }
  while (i <= q) {
    temp.push(arr[i++])
  }
  while (j <= r) {
    temp.push(arr[j++])
  }
  i = p
  let t = 0
  while (i <= r) {
    count++
    if (count === K) {
      console.log(temp[t])
    }
    arr[i++] = temp[t++]
  }
}

mergeSort(inputArr, 0, inputArr.length - 1)

if (count < K) console.log(-1)
