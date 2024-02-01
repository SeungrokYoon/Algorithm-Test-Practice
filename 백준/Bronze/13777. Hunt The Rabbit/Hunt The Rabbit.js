const inputArr = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => +s)

inputArr.pop()

const answer = inputArr
  .map((rabbit) => {
    let left = 1
    let right = 50
    const paths = []
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      paths.push(mid)
      if (mid === rabbit) {
        break
      } else if (mid > rabbit) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return paths.join(' ')
  })
  .join('\n')

console.log(answer)
