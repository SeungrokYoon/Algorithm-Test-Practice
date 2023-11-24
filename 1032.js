const inputArr = require('fs').readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt').toString().trim().split('\n')

const N = +inputArr.shift()
let answer = ''

for (let i = 0; i < inputArr[0].length; i++) {

  let same = true

  for (let j = 1; j < N; j++) {
    if (inputArr[0][i] !== inputArr[j][i]) {
      same = false
      break
    }
  }
  same ? answer += inputArr[0][i] : answer += '?'
}

console.log(answer)