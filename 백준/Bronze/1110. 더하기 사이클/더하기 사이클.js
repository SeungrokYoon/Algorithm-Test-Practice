const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split(' ')

const genNextNum = (n) => {
  const sum = parseInt(n / 10) + (n % 10)
  return (n % 10) * 10 + parseInt(sum % 10)
}

let count = 1

let nextNum = genNextNum(N)
while (N !== nextNum) {
  nextNum = genNextNum(nextNum)
  count++
}

console.log(count)
