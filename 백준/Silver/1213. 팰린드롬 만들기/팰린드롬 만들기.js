const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const SORRY = "I'm Sorry Hansoo"

const solution = (str) => {
  const obj = new Map()
  for (let i = 0; i < input.length; i++) {
    obj.has(str[i]) ? obj.set(str[i], obj.get(str[i]) + 1) : obj.set(str[i], 1)
  }

  const oddKeys = []
  let numOfOdds = 0
  obj.forEach((value, key) => {
    if (value % 2 === 1) {
      numOfOdds++
      oddKeys.push(key)
    }
  })

  const canPallindrom = numOfOdds === 0 || numOfOdds === 1 ? true : false
  if (!canPallindrom) return SORRY
  let leftPart = ''
  let rightPart = ''
  const keys = obj.keys()
  for (const key of [...keys].sort()) {
    const count = Math.floor(obj.get(key) / 2)
    leftPart = leftPart + key.repeat(count)
    rightPart = key.repeat(count) + rightPart
    obj.set(key, obj.get(key) - count * 2)
  }

  if (numOfOdds === 0) return leftPart + rightPart
  return leftPart + oddKeys[0] + rightPart
}

console.log(solution(input))
