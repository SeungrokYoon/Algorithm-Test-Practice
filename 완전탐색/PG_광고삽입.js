const toSeconds = (time) => {
  return time.split(':').reduce((prev, curr) => prev * 60 + curr * 1, 0)
}

const toHHMMSS = (sec) => {
  const HH = Math.floor(sec / 3600) > 9 ? '' + Math.floor(sec / 3600) : '0' + Math.floor(sec / 3600)
  const MM =
    Math.floor((sec % 3600) / 60) > 9
      ? '' + Math.floor((sec % 3600) / 60)
      : '0' + Math.floor((sec % 3600) / 60)
  const SS = (sec % 3600) % 60 > 9 ? '' + ((sec % 3600) % 60) : '0' + ((sec % 3600) % 60)
  return `${HH}:${MM}:${SS}`
}

function solution(play_time, adv_time, logs) {
  var answer = ''
  const playTime = toSeconds(play_time)
  const advTime = toSeconds(adv_time)
  //imos에 누적합 변화율을 O(1)시간으로 저장을 해놓고, O(n)시간에 누적합을 구한다.
  //imos의 누적합을 저장하는 dp를 통해 누적합 구할 때 구간의 누적합을 O(1)만에 구할 수 있도록 합니다.
  const imosDP = new Array(playTime + 1).fill(0)
  const sumDP = new Array(playTime + 1).fill(0)
  //imos 채우기
  logs.forEach((log) => {
    const [startTime, endTime] = log.split('-').map(toSeconds)
    imosDP[startTime]++
    imosDP[endTime]--
  })
  //imosDP, sumDP 채우기
  sumDP[0] = imosDP[0]
  for (let i = 1; i < playTime + 1; i++) {
    imosDP[i] = imosDP[i - 1] + imosDP[i]
    sumDP[i] = sumDP[i - 1] + imosDP[i]
  }
  //구간의 누적합을 찾아보면서 최대 누적 시청자수 지점의 최초 지점을 기록
  let theEarlestStartTime = 0
  let maxSum = sumDP[advTime]
  for (let adEnd = advTime - 1; adEnd < imosDP.length; adEnd++) {
    const adStart = adEnd - advTime + 1
    const subSum = sumDP[adEnd] - sumDP[adStart - 1]
    if (subSum > maxSum) {
      theEarlestStartTime = adStart
      maxSum = subSum
    }
  }
  answer = toHHMMSS(theEarlestStartTime)
  return answer
}
