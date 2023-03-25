const [hour, minute] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const totalMinute = 60 * hour + minute
const delta = 45
const targetHour = totalMinute - delta >= 0 ? totalMinute - delta : totalMinute - delta + 60 * 24

console.log(`${Math.floor(targetHour / 60)} ${targetHour % 60}`)
