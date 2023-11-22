const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
inputArr.pop()

const isPalindrom = (str) => {
  let left = 0
  let right = str.length - 1
  while (left < right) {
    if (str[left] !== str[right]) break
    left++
    right--
  }
  return left >= right
}

const answer = inputArr
  .reduce((acc, currStr) => {
    acc.push(isPalindrom(currStr) ? 'yes' : 'no')
    return acc
  }, [])
  .join('\n')

console.log(answer)
