const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

let answer = ''

for (let i = 0; i < N; i++) {
  answer += '*'.repeat(i + 1) + '\n'
}

console.log(answer)
