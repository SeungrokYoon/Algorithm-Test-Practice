const [X, Y] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const daysByMonth = Array.from({ length: 2 }, () => [])
daysByMonth[0] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
daysByMonth[1].push(0)
for (let i = 1; i < 13; i++) {
  daysByMonth[1].push(daysByMonth[1][i - 1] + daysByMonth[0][i])
}

const daysFromFirstDate = daysByMonth[1][X - 1] + Y
const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][daysFromFirstDate % 7]

console.log(day)
