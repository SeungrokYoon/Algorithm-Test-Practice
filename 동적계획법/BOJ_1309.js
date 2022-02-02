const input =
  require('fs')
    .readFileSync(__dirname + '/test.txt')
    .toString()
    .trim() * 1

const solution = (n) => {
  const arr = new Array(n + 1)
  arr[0] = 0
  arr[1] = 3
  arr[2] = 7
  for (let i = 3; i <= n; i++) {
    arr[i] = (2 * arr[i - 1] + arr[i - 2]) % 9901
  }
  return arr[n]
}

console.log(solution(input))
