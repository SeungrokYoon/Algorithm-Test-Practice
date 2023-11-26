const input =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

let answer = ''

for (let i = 0; i < input; i++) {
  answer += ' '.repeat(input - 1 - i) + '*'.repeat(i + 1) + '\n'
}

console.log(answer)
