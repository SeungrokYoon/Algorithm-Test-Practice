function solution(fees, records) {
  var answer = []
  const [basicTime, basicFee, timeSlice, overCharge] = fees
  const LASTTIME = 23 * 60 + 59
  const carMap = {}
  const result = []
  records.forEach((record) => {
    const [time, carNum, status] = record.split(' ')
    const minutes = time.split(':')[0] * 60 + time.split(':')[1] * 1
    if (status === 'IN') {
      if (carNum in carMap) {
        carMap[carNum].timestamp.push(minutes)
        carMap[carNum].status.pop()
        carMap[carNum].status.push('IN')
      } else {
        const data = { carnumber: carNum, timestamp: [minutes], status: ['IN'], accTime: 0 }
        carMap[carNum] = data
      }
    } else {
      //시간계산,
      //status에서 pop
      carMap[carNum].status.pop()
      carMap[carNum].status.push('OUT')
      //timestamp에서 pop
      const timeDelta = minutes - carMap[carNum].timestamp.pop()
      carMap[carNum].accTime += timeDelta
    }
  })

  Object.keys(carMap).forEach((carNumber) => {
    //출차 안한 차량 처리
    if (carMap[carNumber].timestamp.length) {
      const plusTime = LASTTIME - carMap[carNumber].timestamp.pop()
      carMap[carNumber].accTime += plusTime
    }
    //주차요금 정산
    const totalTime = carMap[carNumber].accTime
    const totalPrice =
      totalTime <= basicTime
        ? basicFee
        : basicFee + Math.ceil((totalTime - basicTime) / timeSlice) * overCharge
    result.push([carNumber, totalPrice])
  })
  answer = result.sort((a, b) => a[0] - b[0]).map((e) => e[1])
  return answer
}
