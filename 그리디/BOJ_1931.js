//https://www.acmicpc.net/problem/1931
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = input.shift()
input = input.map((schedule) => {
  const [start, end] = schedule.split(' ').map((i) => +i)
  return { start, end }
})

const solution = () => {
  input.sort((prev, current) => prev.end - current.end || prev.start - current.start)
  let counter = 1
  let startTime = input[0].end
  for (let i = 1; i < N; i++) {
    const meeting = input[i]
    const { start, end } = meeting
    if (startTime <= start) {
      counter++
      startTime = end
    }
  }
  console.log(counter)
}
solution()
