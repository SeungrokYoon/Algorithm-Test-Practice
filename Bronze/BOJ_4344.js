const [n, ...inputArr] = require('fs').readFileSync('test/test.txt').toString().trim().split('\n')

const calculateOverAverageRatio = (l, arr) => {
  const sum = arr.reduce((acc, curr) => acc + curr, 0)
  const average = sum / l
  const ratio = (arr.reduce((acc, eachScore) => (eachScore > average ? acc + 1 : acc), 0) / l) * 100

  return ratio.toFixed(3).toString()
}

const answer = inputArr.reduce((acc, curr) => {
  const [l, ...arr] = curr.split(' ').map(Number)
  acc.push(`${calculateOverAverageRatio(l, arr)}%`)
  return acc
}, [])

console.log(answer.join('\n'))
