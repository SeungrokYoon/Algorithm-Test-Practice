const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const [A, B, C] = input.split(' ').map(BigInt)
const power = (base, times, mod) => {
  if (base === BigInt(1)) return BigInt(1)
  if (times === BigInt(1)) return base % mod
  if (times % BigInt(2) === BigInt(1)) {
    const nextPow = (times - BigInt(1)) / BigInt(2)
    const subResult = power(base, nextPow, mod)
    return (subResult * subResult * base) % mod
  } else {
    const nextPow = times / BigInt(2)
    const subResult = power(base, nextPow, mod)
    return (subResult * subResult) % mod
  }
}

console.log(power(A, B, C).toString())
