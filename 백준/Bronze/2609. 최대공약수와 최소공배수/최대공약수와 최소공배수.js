const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const [A, B] = input

const findGCD = (a, b) => {
  let gcd = 1
  for (let i = 2; i < Math.min(a, b) + 1; i++) {
    if (a % i === 0 && b % i === 0) gcd = i
  }
  return gcd
}

const findLCM = (gcd, a, b) => {
  return gcd * (a / gcd) * (b / gcd)
}

const solution = (a, b) => {
  const gcd = findGCD(a, b)
  const lcm = findLCM(gcd, a, b)
  return [gcd, lcm].join('\n')
}

console.log(solution(A, B))
