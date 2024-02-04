let [END_DAY, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
END_DAY = +END_DAY
arr = [[0, 0], ...arr.map((l) => l.split(' ').map(Number))]
const consultingInfo = { endTime: 0, totalP: 0 }
let answer = 0

const searchMaxPrice = (currentDay) => {
  for (let selectedDay = currentDay + 1; selectedDay <= END_DAY; selectedDay++) {
    const DURATION = arr[selectedDay][0] - 1
    if (selectedDay + DURATION > END_DAY) continue
    if (consultingInfo.endTime >= selectedDay) continue
    const prevEndTime = consultingInfo.endTime
    consultingInfo.endTime = selectedDay + DURATION
    consultingInfo.totalP += arr[selectedDay][1]
    answer = Math.max(answer, consultingInfo.totalP)
    searchMaxPrice(selectedDay)
    consultingInfo.endTime = prevEndTime
    consultingInfo.totalP -= arr[selectedDay][1]
  }
}

searchMaxPrice(0)
console.log(answer)
