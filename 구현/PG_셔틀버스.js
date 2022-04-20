const generateShuttleArr = (n, t) => {
  const shuttleTimes = []
  const startTime = 9 * 60 //minutes
  //셔틀버스 오는 시간 파악
  for (let i = 0; i < n; i++) {
    shuttleTimes.push(startTime + t * i)
  }

  //24시는 셔틀 없음
  if (shuttleTimes[shuttleTimes.length - 1] === 60 * 24) shuttleTimes.pop()
  return shuttleTimes
}

const generateArrivals = (arr) => {
  const arrivals = arr.map((time) => {
    const [hour, minute] = time.split(':').map(Number)
    return hour * 60 + minute
  })
  arrivals.sort((a, b) => a - b)
  return arrivals
}

const convertToTime = (minutes) => {
  let hour = `${Math.floor(minutes / 60)}`
  let minute = `${minutes % 60}`
  return `${hour.length < 2 ? '0' + hour : hour}:${minute.length < 2 ? '0' + minute : minute}`
}

function solution(n, t, m, timetable) {
  var answer = ''
  const shuttleTimes = generateShuttleArr(n, t)
  const arrivals = generateArrivals(timetable)
  for (const departure of shuttleTimes) {
    let isLastBus = departure === shuttleTimes[shuttleTimes.length - 1]
    if (!isLastBus) {
      let counter = 0
      while (arrivals.length && departure >= arrivals[0] && counter < m) {
        arrivals.shift()
        counter++
      }
      continue
    }
    //마지막 버스가 맞다면 무조건 타야함
    //이 사람들 중, 내가 껴야 할 시간대를 알아봐야 함.m명만큼 빼보자. 만약 lastPassengers에 사람이 남아 있으면, 나는 못타는겨
    const lastOnboradPassengers = []
    let counter = 0
    while (arrivals.length && departure >= arrivals[0] && counter < m) {
      lastOnboradPassengers.push(arrivals.shift())
      counter++
    }
    if (lastOnboradPassengers.length === m) {
      //가장 마지막 사람을 내리게 하고, 그 사람의 시간보다 1 적으면 된다.
      const theLastPassenger = lastOnboradPassengers[lastOnboradPassengers.length - 1]
      answer = theLastPassenger - 1
    } else {
      //자리가 비어있으니, 버스 출발할 때 타면 된다.
      answer = departure
    }
  } //for
  answer = convertToTime(answer)
  return answer
}
