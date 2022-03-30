const [[N], ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const sortArr = (arr, mapper) => {
  const data = []
  arr.forEach((row) => {
    data.push([...row])
  })
  data.sort(mapper)
  return data
}

let startedIndex = 0
let endedIndex = 0

const startLectures = sortArr(arr, (a, b) => a[0] - b[0])
const endLectures = sortArr(arr, (a, b) => a[1] - b[1])

let max = 0
let currentClassrooms = 0
for (let i = 0; i < endLectures[endLectures.length - 1][1]; i++) {
  if (startedIndex < N && startLectures[startedIndex][0] === i) {
    currentClassrooms++
    startedIndex++
  }
  if (endedIndex < N && endLectures[endedIndex][1] === i) {
    currentClassrooms--
    endedIndex++
  }
  max = Math.max(currentClassrooms, max)
}

console.log(max)
