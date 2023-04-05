const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')
let answer = ''
for (let column = 0; column < 15; column++) {
  for (let row = 0; row < inputArr.length; row++) {
    if (inputArr[row][column]) {
      answer += inputArr[row][column]
    }
  }
}

console.log(answer)
