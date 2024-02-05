let [N, ...TEST_DATA] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
N = +N

let idx = 0
const answer = []
while (idx < TEST_DATA.length) {
  const LINES = +TEST_DATA[idx]
  const NUMBERS = TEST_DATA.slice(idx + 1, idx + 1 + LINES).sort()
  let isConsistent = true
  for (let startIdx = 0; startIdx < NUMBERS.length; startIdx++) {
    const currNum = NUMBERS[startIdx]
    if (!isConsistent) break
    for (let compareIdx = startIdx + 1; compareIdx < NUMBERS.length; compareIdx++) {
      const compareNum = NUMBERS[compareIdx]
      if (currNum.length >= compareNum.length) continue
      if (compareNum.startsWith(currNum)) {
        isConsistent = false
        break
      }
    }
  }
  answer.push(isConsistent ? 'YES' : 'NO')
  idx += LINES + 1
}

console.log(answer.join('\n'))
