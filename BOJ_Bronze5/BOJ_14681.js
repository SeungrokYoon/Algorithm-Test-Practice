//이 문제에서는 readFileSync 가 런타임 에러를 내뿜음 따라서 readline을 사용하자.
//const [x, y] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(parseInt)

const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const inputArr = []
rl.on('line', (line) => {
  inputArr.push(line * 1)
}).on('close', () => {
  const [x, y] = inputArr
  if (x > 0 && y > 0) {
    console.log(1)
  } else if (x > 0 && y < 0) {
    console.log(4)
  } else if (x < 0 && y < 0) {
    console.log(3)
  } else if (x < 0 && y > 0) {
    console.log(2)
  }
})
