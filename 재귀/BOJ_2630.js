const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const n = parseInt(input.shift())
const arr = input.map((i) => i.split(' ').map((num) => parseInt(num)))

const solution = (n, arr) => {
  let white = 0
  let blue = 0
  const subTask = (size, startX, startY, arr) => {
    let subSum = 0
    if (size === 1) {
      arr[startY][startX] === 0 ? (white += 1) : (blue += 1)
      return
    }
    for (let y = startY; y < startY + size; y++) {
      subSum += arr[y].slice(startX, startX + size).reduce((a, b) => a + b, 0)
    }
    if (subSum === size ** 2) {
      blue += 1
      return
    } else if (subSum === 0) {
      white += 1
      return
    }
    const nextSize = Math.floor(size / 2)
    subTask(nextSize, startX, startY, arr)
    subTask(nextSize, startX, startY + nextSize, arr)
    subTask(nextSize, startX + nextSize, startY, arr)
    subTask(nextSize, startX + nextSize, startY + nextSize, arr)
  }
  subTask(n, 0, 0, arr)
  console.log(white)
  console.log(blue)
}

solution(n, arr)
