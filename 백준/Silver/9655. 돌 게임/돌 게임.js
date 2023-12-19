const N = +require('fs').readFileSync('dev/stdin').toString().trim()
console.log(N % 2 === 0 ? 'CY' : 'SK')
