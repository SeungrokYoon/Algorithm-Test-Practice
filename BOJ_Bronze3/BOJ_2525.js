const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n')
const DAY = 24 * 60

const time = input[0]
  .split(' ')
  .map(Number)
  .reduce((prev, curr, currentIndex) => (currentIndex === 0 ? prev + curr * 60 : prev + curr), 0)
const timeDelta = input[1] * 1

const endTime = time + timeDelta < DAY ? time + timeDelta : time + timeDelta - DAY

console.log(`${Math.floor(endTime / 60)} ${endTime % 60}`)
