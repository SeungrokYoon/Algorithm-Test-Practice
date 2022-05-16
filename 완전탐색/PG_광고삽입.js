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
  //imosArr에 누적합 변화율을 O(1)시간으로 저장을 해놓고, 누적합을 저장하는 dp를 통해 누적합 구할 때 O(1)만에 구할 수 있도록 합니다.
  const imosArr = new Array(playTime + 1).fill(0)
  const dp = new Array(playTime + 1).fill(0)
  //imos 채우기
  logs.forEach((log) => {
    const [startTime, endTime] = log.split('-').map(toSeconds)
    imosArr[startTime]++
    imosArr[endTime]--
  })
  //imosArr, dp 채우기
  dp[0] = imosArr[0]
  for (let i = 1; i < playTime + 1; i++) {
    imosArr[i] = imosArr[i] + imosArr[i - 1]
    dp[i] = dp[i - 1] + imosArr[i]
  }
  //dp에서 순회하며 찾아보기 최대 누적 시청자 수인 구간을 찾기
  let theEarlestStartTime = 0
  let maxAcc = dp[advTime]
  for (let i = advTime - 1; i < imosArr.length; i++) {
    const advEnd = i
    const advStart = i - advTime + 1 //이래야 advStart+1 부터 advEnd까지 합해서 i 간격이 됨
    const acc = dp[advEnd] - dp[advStart - 1]
    if (acc > maxAcc) {
      theEarlestStartTime = advStart
      maxAcc = acc
    }
  }
  console.log(theEarlestStartTime)
  answer = toHHMMSS(theEarlestStartTime)
  return answer
}
