function solution(stones, k) {
  let answer = 0
  let left = 1
  // let right = [...stones].sort((a, b) => b - a)[0] 는 시간초과
  let right = 200000000
  while (left <= right) {
    const people = Math.floor((left + right) / 2)
    let consecutiveZeros = 0
    for (let i = 0; i < stones.length; i++) {
      if (consecutiveZeros < k) {
        if (stones[i] - people <= 0) {
          consecutiveZeros++
        } else {
          consecutiveZeros = 0
        }
      } else {
        break
      }
    }
    if (consecutiveZeros < k) {
      left = people + 1
    } else {
      answer = people
      right = people - 1
    }
  }
  return answer
}
