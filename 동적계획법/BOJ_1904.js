const input =
  require('fs')
    .readFileSync(__dirname + '/test.txt')
    .toString()
    .trim() * 1
const solution = (n) => {
  const arr = new Array(n + 1).fill(0)
  arr[0] = 0
  arr[1] = 1
  arr[2] = 2
  for (let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 15746
  }
  console.log(arr)
  return arr[n]
}

console.log(solution(input))
