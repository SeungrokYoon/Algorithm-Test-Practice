function solution(lines) {
  let answer = 0
  let counter = 0
  const allTimes = []
  const logs = []
  //millisecond로 변환 후 정렬
  lines.forEach((line) => {
    const [_, endTime, duration] = line.split(' ')
    const [hour, minute, second] = endTime.split(':').map(Number)
    const milliEndTime = (hour * 3600 + minute * 60 + second) * 1000
    const milliDuration = duration.slice(0, duration.length - 1) * 1000
    const millliStartTime = milliEndTime - (milliDuration - 1)
    allTimes.push(millliStartTime)
    allTimes.push(milliEndTime)
    logs.push({ start: millliStartTime, end: milliEndTime })
  })
  allTimes.sort((a, b) => a - b)
  logs.sort((a, b) => a.start - b.start)
  //시작시간과 종료시간 기준으로 탐색 시작 <- 처리 작업의 개수가 변하는 경우는 시작시간과 종료시간밖에 없으니
  for (let i = 0; i < allTimes.length; i++) {
    const leftWindow = allTimes[i]
    const rightWindow = leftWindow + 999
    for (let j = 0; j < logs.length; j++) {
      const { start, end } = logs[j]
      if (
        (start >= leftWindow && start <= rightWindow) ||
        (end >= leftWindow && end <= rightWindow) ||
        (start <= leftWindow && rightWindow <= end)
      ) {
        counter++
      }
    }
    answer = Math.max(counter, answer)
    counter = 0
  }
  return answer
}
