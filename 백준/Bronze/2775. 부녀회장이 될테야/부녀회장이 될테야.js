const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const MAX = 15
const apartment = Array.from({ length: MAX }, () =>
  Array.from({ length: MAX }, (_, index) => index),
)

const answer = []
for (let floor = 1; floor < MAX; floor++) {
  for (let room = 1; room < MAX; room++) {
    apartment[floor][room] = apartment[floor - 1][room] + apartment[floor][room - 1]
  }
}

for (let i = 1; i < input.length; i += 2) {
  const room = input[i]
  const floor = input[i + 1]
  answer.push(apartment[room][floor])
}

console.log(answer.join('\n'))
