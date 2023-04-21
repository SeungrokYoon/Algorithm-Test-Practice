//S4: https://www.acmicpc.net/problem/1269
const [info, numsA, numsB] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const aSet = new Set(numsA.split(' ').map(Number))
const bSet = new Set(numsB.split(' ').map(Number))

Set.prototype.subtract = function (subSet) {
  const rest = new Set()
  for (const val of this) {
    if (!subSet.has(val)) {
      rest.add(val)
    }
  }
  return rest
}

const answer = aSet.subtract(bSet).size + bSet.subtract(aSet).size
console.log(answer)
