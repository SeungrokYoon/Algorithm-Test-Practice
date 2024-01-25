const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]

let pushCounter = 0
let index = 0
let prev = Infinity
const towers = input[1].split(' ').map(Number)
while (index < N) {
  if (prev > towers[index]) {
    prev = towers[index]
    index++
  } else {
    pushCounter++
    prev = towers[index]
    index++
  }
}

console.log(pushCounter + 1)
