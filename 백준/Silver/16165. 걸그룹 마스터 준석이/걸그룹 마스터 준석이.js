const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [GROUP, QUIZ] = input[0].split(' ').map(Number)
const answer = []
const groupMap = new Map()
const memberMap = new Map()
let idx = 1
for (let group = 0; group < GROUP; group++) {
  const groupName = input[idx]
  const arr = []
  const groupSize = Number(input[idx + 1])
  for (let j = idx + 2; j < idx + 2 + groupSize; j++) {
    arr.push(input[j])
    memberMap.set(input[j], groupName)
  }
  groupMap.set(groupName, arr)
  idx += groupSize + 2
}
while (idx < input.length) {
  const quiz = input[idx]
  const quizType = Number(input[idx + 1])
  if (quizType === 0) {
    const members = Array.from(groupMap.get(quiz)).sort()
    answer.push(...members)
  } else {
    answer.push(memberMap.get(quiz))
  }
  idx += 2
}

console.log(answer.join('\n'))
