const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const n = input[0] * 1

function repeteChar(arr, i) {
  const [repetition, str] = arr[i].split(' ')
  const answer = str.split('').reduce((prevStr, currChar) => {
    return (prevStr += currChar.repeat(parseInt(repetition)))
  }, '')
  console.log(answer)
}

for (let i = 1; i < n + 1; i++) {
  repeteChar(input, i)
}
