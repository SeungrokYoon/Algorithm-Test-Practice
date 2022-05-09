const getSum = (q) => {
  return q.reduce((a, b) => a + b, 0)
}

function solution(queue1, queue2) {
  //투포인터
  var answer = -2
  const result = []
  const newQueue1 = [0, ...queue1, ...queue2]
  const newQueue2 = [0, ...queue2, ...queue1]
  const dp1 = Array.from({ length: newQueue1.length }, () => 0)
  const dp2 = Array.from({ length: newQueue2.length }, () => 0)
  //초기값만들어놓기
  for (let i = 1; i < queue1.length + 1; i++) {
    dp1[i] = newQueue1[i] + dp1[i - 1]
    dp2[i] = newQueue2[i] + dp2[i - 1]
  }
  const sum1 = queue1.reduce((a, b) => a + b, 0)
  const sum2 = queue2.reduce((a, b) => a + b, 0)
  if (sum1 === sum2) return 0
  const half = Math.floor((sum1 + sum2) / 2)
  //newQueue1에 대해서 검증
  let left = 0
  let rightStart = queue1.length
  let right = queue1.length
  while (left < right && left < newQueue1.length && right < newQueue1.length) {
    const currentSum = dp1[right] - dp1[left]
    if (currentSum === half) {
      result.push(right - rightStart + left)
      break
    } else if (currentSum > half) {
      left++
    } else {
      right++
      dp1[right] = newQueue1[right] + dp1[right - 1]
    }
  }
  //newQueue2에 대해서 검증
  left = 0
  rightStart = queue2.length
  right = queue2.length
  while (left < right && left < newQueue2.length && right < newQueue2.length) {
    const currentSum = dp2[right] - dp2[left]
    if (currentSum === half) {
      result.push(right - rightStart + left)
      break
    } else if (currentSum > half) {
      left++
    } else {
      right++
      dp2[right] = newQueue2[right] + dp2[right - 1]
    }
  }
  result.sort((a, b) => a - b)
  answer = result.length ? result[0] : -1
  return answer
}
