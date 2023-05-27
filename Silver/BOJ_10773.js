//S4: 제로
/*
  아래와 같이 인풋을 한 번에 받는방법은 메모리낭비라고 생각했기에, readline 모듈을 import해서 풀어보겠다. 
  const dirByPlatform = process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt'
  const inputArr = require('fs').readFileSync(dirByPlatform).toString().split('\n').map(Number)
*/

const rl = require('readline')
const readlineInterface = rl.createInterface({ input: process.stdin, output: process.stdout })

const stack = []

const solution = (l) => {
  parseInt(l) === 0 ? stack.pop() : stack.push(parseInt(l))
}

readlineInterface.on('line', solution).on('close', () => {
  const answer = stack.reduce((acc, current, index) => (index == 0 ? acc : acc + current), 0)
  console.log(answer)
  process.exit()
})
