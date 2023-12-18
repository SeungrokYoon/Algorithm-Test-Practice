const input = +require('fs').readFileSync('dev/stdin').toString().trim()
const answer = Array.from({ length: input }, (_, i) => input - i).join('\n')
console.log(answer)
