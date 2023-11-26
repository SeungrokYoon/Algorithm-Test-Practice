const input =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const map = new Map()

let curr = 1
while (curr <= input) {
  let temp = curr
  while (temp % 2 === 0) {
    temp /= 2
    map.has(2) ? map.set(2, map.get(2) + 1) : map.set(2, 1)
  }
  while (temp % 5 === 0) {
    temp /= 5
    map.has(5) ? map.set(5, map.get(5) + 1) : map.set(5, 1)
  }
  curr++
}

const answer = map.has(2) && map.has(5) ? Math.min(map.get(2), map.get(5)) : 0
console.log(answer)
