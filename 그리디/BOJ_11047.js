const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const solution = (input) => {
  let [N, target] = input.shift().split(' ').map(Number)
  const arr = input.map(Number)
  let counter = 0
  for (let i = N - 1; i >= 0; i--) {
    if (arr[i] <= target) counter += Math.floor(target / arr[i])
    target = target % arr[i]
  }
  console.log(counter)
}

solution(input)
