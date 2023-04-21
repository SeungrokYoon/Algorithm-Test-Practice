const [n, k] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const binomialRecursive = (n, r) => {
  if (r < 0 || r > n) return 0
  if (n === r || r === 0) return 1
  return binomialRecursive(n - 1, r - 1) + binomialRecursive(n - 1, r)
}

console.log(binomialRecursive(n, k))
