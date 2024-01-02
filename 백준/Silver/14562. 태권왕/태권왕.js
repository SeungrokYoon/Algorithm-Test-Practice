const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const TEST_SIZE = +input[0]
const answer = []
input.slice(1).forEach((l) => {
  const [S, T] = l.split(' ').map(Number)
  answer.push(solution(S, T))
})

function solution(S, T) {
  const queue = [[S, T, 0]]
  const counterMap = new Map()
  counterMap.set(S, 0)
  let kicks = Infinity
  while (queue.length) {
    const [currNum, nextT, count] = queue.shift()
    // console.log(currNum, nextT, count)
    if (currNum === nextT) {
      // console.log('kick')
      kicks = Math.min(kicks, count)
      continue
    }
    const s1 = currNum * 2
    const t1 = nextT + 3
    if (s1 <= t1) {
      const min = count + 1
      counterMap.set(s1, min)
      queue.push([s1, t1, min])
    }
    const s2 = currNum + 1
    const t2 = nextT
    if (s2 <= t2) {
      const min = count + 1
      counterMap.set(s2, min)
      queue.push([s2, t2, min])
    }
  }
  return kicks
}

console.log(answer.join('\n'))
