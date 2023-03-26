const [[M, N], ...infoArr] = require('fs')
  .readFileSync('test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const arr = new Array(M + 1).fill().map((_, index) => index)
console.log('arr', arr)

const answer = infoArr.reduce((prevArr, currInput) => {
  const [i, j, k] = currInput
  const newArr = []
  let tempArr = []
  prevArr.forEach((num, index) => {
    if (index < i) {
      newArr.push(num)
    } else if (index >= i && index < k) {
      tempArr.push(num)
    } else if (index >= k && index < j) {
      newArr.push(num)
    } else {
      if (index === j + 1) {
        tempArr.forEach((el) => newArr.push(el))
        tempArr = []
      }
      newArr.push(num)
      if (index === M) {
        tempArr.forEach((el) => newArr.push(el))
      }
    }
  })
  return newArr
}, arr)

console.log(answer.slice(1).join(' '))
