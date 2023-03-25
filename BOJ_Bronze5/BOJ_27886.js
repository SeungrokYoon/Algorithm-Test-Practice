const readline = require('readline')
const rn = readline.createInterface({ input: process.stdin, output: process.stdout })

const input = []
rn.on('line', (line) => {
  input.push(line)
}).on('close', () => {
  const [word, n] = input
  console.log(word[n * 1 - 1])
  process.exit()
})
