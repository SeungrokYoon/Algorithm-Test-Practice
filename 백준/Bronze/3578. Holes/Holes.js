const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

let target = N
let answer = ''
while (target > 0) {
  if (target >= 2) {
    answer = 8 + answer
    target -= 2
  } else if (target >= 1) {
    if (answer.length) {
      answer = 4 + answer
    } else {
      answer = 0 + answer
    }
    target -= 1
  }
}

console.log(N === 0 ? 1 : answer)
