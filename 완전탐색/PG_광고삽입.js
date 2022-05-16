const toSeconds = (time) => {
  return time.split(':').reduce((prev, curr) => prev * 60 + curr * 1, 0)
}

function solution(play_time, adv_time, logs) {
  var answer = ''
  const playSec = toSeconds(play_time)
  const advSec = toSeconds(adv_time)
  const timeSet = new Set()
  timeSet.add('0-00:00:00')
  timeSet.add(`${playSec}-${play_time}`)
  logs = logs.map((log) => {
    const [startLog, endLog] = log.split('-')
    const [startT, endT] = [startLog, endLog].map(toSeconds)
    timeSet.add(`${startT}-${startLog}`)
    timeSet.add(`${endT}-${endLog}`)
    return [startT, endT, log]
  })
  logs.sort((a, b) => a[0] - b[0])
  const timeList = [...timeSet].map((el) => {
    const [time, log] = el.split('-')
    return [Number(time), log]
  })
  timeList.sort((a, b) => a[0] - b[0])
  let maxAdvTime = 0
  timeList.forEach((el) => {
    const startTime = el[0]
    const endTime = startTime + advSec
    let accAdvTime = 0
    logs.forEach((log) => {
      const [logStart, logEnd] = log
      if (
        logStart <= startTime &&
        startTime <= logEnd &&
        logStart <= endTime &&
        endTime <= logEnd
      ) {
        accAdvTime += advSec
      } else if (logStart <= startTime && startTime <= logEnd) {
        accAdvTime += logEnd - startTime + 1
      } else if (logStart <= endTime && endTime <= logEnd) {
        accAdvTime += endTime - logStart + 1
      } else if (startTime < logStart && logEnd < endTime) {
        accAdvTime += logEnd - logStart + 1
      }
    })
    if (maxAdvTime < accAdvTime) {
      maxAdvTime = accAdvTime
      answer = el[1]
    }
  })
  return answer
}
