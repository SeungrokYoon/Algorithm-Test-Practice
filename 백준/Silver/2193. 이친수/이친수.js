const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const solution = (N) => {
  const dpTable = Array.from({ length: 2 }, () => Array.from({ length: N + 1 }, () => BigInt(0)))

  dpTable[1][1] = BigInt(1)

  for (let i = 2; i <= N; i++) {
    dpTable[0][i] = dpTable[0][i - 1] + dpTable[1][i - 1]
    dpTable[1][i] = dpTable[0][i - 1]
  }

  return (dpTable[0][N] + dpTable[1][N]).toString()
}

console.log(solution(N))