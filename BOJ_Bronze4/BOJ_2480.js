const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : `${__dirname}/test.txt`)
  .toString()
  .trim()
  .split(' ')
  .map(Number)
const max = Math.max(...inputArr)
const inputObj = inputArr.reduce((prev, curr) => {
  if (prev[curr]) {
    prev[curr] += 1
  } else {
    prev[curr] = 1
  }
  return prev
}, {})

const len = Object.keys(inputObj).length
if (len === 1) {
  console.log(10000 + max * 1000)
} else if (len === 2) {
  const key = Object.entries(inputObj).filter((el) => el[1] === 2)[0][0]
  console.log(1000 + key * 100)
} else {
  console.log(max * 100)
}
