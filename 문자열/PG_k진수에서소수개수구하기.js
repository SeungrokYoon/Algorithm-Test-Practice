const checkIsPrime = (n) => {
  if (n === 0 || n === 1) return false
  if (n === 2 || n === 3) return true
  let isPrime = true
  for (let i = 2; i <= n ** 0.5; i++) {
    if (n % i) continue
    isPrime = false
    break
  }
  return isPrime
}

function solution(n, k) {
  const answer = n
    .toString(k)
    .split(/0+/)
    .map(Number)
    .reduce((acc, current) => {
      return checkIsPrime(current) ? acc + 1 : acc
    }, 0)
  return answer
}
