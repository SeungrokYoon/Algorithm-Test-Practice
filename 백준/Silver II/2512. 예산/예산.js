const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

/**nlogn 풀이법을 고안해보자 */

const BUDGET_REQUESTS = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)
const TOTAL_BUDGET = +input[2]

const solution = () => {
  let left = 0
  let right = BUDGET_REQUESTS[BUDGET_REQUESTS.length - 1]

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const calculatedTotal = BUDGET_REQUESTS.reduce((acc, curr) => {
      if (curr > mid) return acc + mid
      return acc + curr
    }, 0)
    if (calculatedTotal <= TOTAL_BUDGET) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return right
}

console.log(solution())
