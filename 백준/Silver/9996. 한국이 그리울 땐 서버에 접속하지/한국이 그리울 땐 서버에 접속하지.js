const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [front, rear] = input[1].split('*')
const answer = input
  .slice(2)
  .map((l) => {
    const regex = new RegExp('^' + front + '[a-z]*' + rear + '$', 'g')
    return regex.test(l) ? 'DA' : 'NE'
  })
  .join('\n')

console.log(answer)
