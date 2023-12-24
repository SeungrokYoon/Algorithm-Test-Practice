const N = +require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const fibonacci = Array(N + 1).fill(BigInt(0))
fibonacci[1] = BigInt(1)

const surface = Array(N + 1).fill(BigInt(0))
surface[1] = BigInt(4)

for (let i = 2; i < N + 1; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
  surface[i] = surface[i - 1] + fibonacci[i] * BigInt(2)
}

console.log(surface[N].toString())
