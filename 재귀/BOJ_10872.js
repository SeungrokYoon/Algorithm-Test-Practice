const N = 1 * require('fs').readFileSync('/dev/stdin').toString().trim()

const solution = (n) => {
  const factorial = (n) => {
    if (n === 1 || n === 0) return 1
    return n * factorial(n - 1)
  }
  const answer = factorial(n)
  return answer
}

console.log(solution(N))
