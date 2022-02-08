const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const input = []

rl.on('line', function (line) {
  input.push(line)
}).on('close', function () {
  const solution = (N, arr) => {
    let answer = 0
    arr
      .sort((a, b) => b - a)
      .forEach((value, index) => {
        if (index % 3 !== 2) answer += value
      })
    console.log(answer)
  }
  const [N, ...arr] = input.map(Number)
  solution(N, arr)
  process.exit()
})
