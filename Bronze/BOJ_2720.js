const [n, ...input] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
const totalAnswer = input.reduce((acc, curr) => {
  const dividend = [25, 10, 5, 1]
  const answer = []
  dividend.reduce((target, currentDividend) => {
    const quota = Math.floor(target / currentDividend)
    const rest = target % currentDividend
    answer.push(quota.toString())
    return rest
  }, curr)
  acc.push(answer.join(' '))
  return acc
}, [])

console.log(totalAnswer.join('\n'))
