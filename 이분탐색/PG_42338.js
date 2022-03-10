//프로그래머스 입국심사
function solution(n, times) {
  let answer = 0
  let left = 1
  let right = n * times[times.length - 1]
  const arr = times.sort((a, b) => a - b)
  while (left <= right) {
    let sum = 0
    const mid = Math.floor((left + right) / 2)
    for (let i = 0; i < times.length; i++) {
      sum += Math.floor(mid / arr[i])
    }
    if (sum >= n) {
      right = mid - 1
      answer = mid
      continue
    }
    left = mid + 1
  }
  return answer
}
