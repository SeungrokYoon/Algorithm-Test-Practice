//가장 긴 증가하는 부분수열 3
let [N, str] = require('fs').readFileSync('test/test.txt').toString().trim().split('\n')
N *= 1
const arr = str.split(' ').map(Number)
const solution = (N, arr) => {
  const LIS = []
  for (let i = 0; i < N; i++) {
    if (LIS.length === 0 || LIS[LIS.length - 1] < arr[i]) {
      LIS.push(arr[i])
    } else {
      //이분탐색을 통한 lower_bound탐색
      let left = 0
      let right = LIS.length - 1
      while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (LIS[mid] >= arr[i]) right = mid
        else left = mid + 1
      }
      LIS[left] = arr[i]
    }
  }
  return LIS.length
}
console.log(solution(N, arr))
