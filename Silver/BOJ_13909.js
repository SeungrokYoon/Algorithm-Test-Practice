const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

let count = 0

for (let i = 1; i < N + 1; i++) {
  if (i * i < N + 1) {
    count++
  } else {
    break
  }
}

console.log(count)
