function solution(lines) {
  let answer = 0
  let counter = 0
  const startLogs = []
  const endLogs = []
  const logs = []
  //millisecond로 변환 후 정렬
  lines.forEach((line) => {
    const [_, endTime, duration] = line.split(' ')
    const [hour, minute, second] = endTime.split(':').map(Number)
    const milliEndTime = (hour * 3600 + minute * 60 + second) * 1000
    const milliDuration = duration.slice(0, duration.length - 1) * 1000
    const millliStartTime = milliEndTime - milliDuration + 1
    startLogs.push(millliStartTime)
    endLogs.push(milliEndTime)
    logs.push({ start: millliStartTime, end: milliEndTime })
  })
  startLogs.sort((a, b) => a - b)
  endLogs.sort((a, b) => a - b)
  logs.sort((a, b) => a.start - b.start)
  //시작시간과 종료시간 기준으로 탐색 시작
  for (let i = 0; i < startLogs.length; i++) {
    //시작시간 기준 이후 1초 탐색
    const leftWindow = startLogs[i]
    const rightWindow = leftWindow + 1000 - 1
    for (let j = 0; j < startLogs.length; j++) {
      const { start, end } = logs[j]
      if (start > rightWindow) break
      if (
        (start >= leftWindow && start <= rightWindow) ||
        (end >= leftWindow && end <= rightWindow)
      )
        counter++
    }
    answer = Math.max(counter, answer)
    counter = 0
  }
  for (let i = 0; i < endLogs.length; i++) {
    //종료시간 기준 이후 1초 탐색
    const leftWindow = endLogs[i]
    const rightWindow = leftWindow + 1000 - 1
    for (let j = 0; j < endLogs.length; j++) {
      const { start, end } = logs[j]
      console.log('left, right', leftWindow, rightWindow, 'start,end', start, end)
      if (start > rightWindow) break
      if (
        (start >= leftWindow && start <= rightWindow) ||
        (end >= leftWindow && end <= rightWindow)
      )
        counter++
    }
    answer = Math.max(counter, answer)
    counter = 0
  }
  return answer
}

console.log(solution(['2016-09-15 01:00:04.002 2.0s', '2016-09-15 01:00:07.000 2s']))
