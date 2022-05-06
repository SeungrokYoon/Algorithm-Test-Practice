function solution(stones, k) {
  let answer = 0
  //건너는 사람 수를 기준으로 이분탐색을 해보자
  let left = 1
  let right = 200000000
  while (left <= right) {
    const people = Math.floor((left + right) / 2)
    let max = 0
    let consecutiveZeros = 0
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] - people <= 0) {
        consecutiveZeros++
      } else {
        max = Math.max(max, consecutiveZeros)
        consecutiveZeros = 0
      }
    }
    max = Math.max(max, consecutiveZeros)
    if (max < k) {
      left = people + 1
    } else {
      answer = people
      right = people - 1
    }
  }
  return answer
}
