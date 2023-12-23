const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

function executeD(register) {
  return register * 2 > 9999 ? (register * 2) % 10000 : register * 2
}
function executeS(register) {
  return (register + 9999) % 10000
}
function executeL(register) {
  return ((register * 10) % 10000) + Math.floor(register / 1000)
}
function executeR(register) {
  return (register % 10) * 1000 + Math.floor(register / 10)
}

const DSLR = [executeD, executeS, executeL, executeR]

const answer = []

input.slice(1).forEach((l) => {
  const [startNum, endNum] = l.split(' ').map(Number)
  const queue = [[startNum, '']]
  const visited = Array(10000).fill(0)
  visited[startNum] = 1
  let head = 0
  while (queue.length > head) {
    const [num, history] = queue[head++]
    visited[num] = 1
    if (num === endNum) {
      answer.push(history)
      break
    }
    const command = ['D', 'S', 'L', 'R']
    for (let i = 0; i < 4; i++) {
      const nextNum = DSLR[i](num)
      if (0 <= nextNum && nextNum < 10000 && !visited[nextNum]) {
        queue.push([nextNum, history + command[i]])
        visited[nextNum] = 1
      }
    }
  }
})

console.log(answer.join('\n'))
