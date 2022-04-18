function solution(lines) {
  let answer = 0
  let counter = 0
  const startLogs = []
  const endLogs = []
  const logs = []
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
  for (let i = 0; i < startLogs.length; i++) {
    //시작시간 기준 이후 1초 탐색
    const startT = startLogs[i]
    const endT = startT + 1000 - 1
    for (let j = 0; j < startLogs.length; j++) {
      const { start, end } = logs[j]
      if (start > endT) break
      if ((start >= startT && start <= endT) || (end >= startT && end <= endT)) counter++
    }
    answer = Math.max(counter, answer)
    counter = 0
  }
  for (let i = 0; i < endLogs.length; i++) {
    //종료시간 기준 이후 1초 탐색
    const startT = endLogs[i]
    const endT = startT + 1000 - 1
    for (let j = 0; j < endLogs.length; j++) {
      const { start, end } = logs[j]
      if (start > endT) break
      if ((start >= startT && start <= endT) || (end >= startT && end <= endT)) counter++
    }
    answer = Math.max(counter, answer)
    counter = 0
  }
  return answer
}

console.log(solution(['2016-09-15 01:00:04.001 2.0s', '2016-09-15 01:00:07.000 2s']))

console.log(
  solution([
    '2016-09-15 20:59:57.421 0.351s',
    '2016-09-15 20:59:58.233 1.181s',
    '2016-09-15 20:59:58.299 0.8s',
    '2016-09-15 20:59:58.688 1.041s',
    '2016-09-15 20:59:59.591 1.412s',
    '2016-09-15 21:00:00.464 1.466s',
    '2016-09-15 21:00:00.741 1.581s',
    '2016-09-15 21:00:00.748 2.31s',
    '2016-09-15 21:00:00.966 0.381s',
    '2016-09-15 21:00:02.066 2.62s',
  ]),
)
