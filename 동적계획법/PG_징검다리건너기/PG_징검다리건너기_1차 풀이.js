function solution(stones, k) {
  //가장 긴 증가하는 부분수열 nlog(n) 응용인듯?
  var answer = 0
  let isStop = false
  let counter = 0
  while (!isStop) {
    const dp = Array.from({ length: stones.length }, () => ({ length: 0, index: -1 }))
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] === 0) {
        //갱신
        if (i - 1 >= 0 && stones[i - 1] === 0) {
          dp[i].length = dp[i - 1].length + 1
          dp[i].index = i
          if (dp[i].length === k) {
            isStop = true
            break
          }
        } else if (i - 1 >= 0 && stones[i - 1] !== 0) {
          //연속이 끊긴 것
          dp[i].length = dp[i - 1].length
          dp[i].index = i
        } else if (i === 0) {
          dp[i].length = 1
          dp[i].index = i
        }
      } else {
        //유지
        if (i - 1 >= 0) {
          dp[i].length = dp[i - 1].length
          dp[i].index = dp[i - 1].length
        }
      }
      stones[i] === 0 ? '' : (stones[i] -= 1)
    }
    answer++
  }
  return answer
}
console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3, 3))
