const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const solution = (n) => {
  //에라토스테네스의 체를 이용한 소수 구하기 시작
  const upperBound = 2 * n
  const max = Math.sqrt(upperBound)
  const arr = Array.from({ length: upperBound + 1 }, () => 1)
  arr[0] = 0
  arr[1] = 0
  for (let i = 2; i <= max; i++) {
    if (arr[i] === 0) continue
    for (let j = i + i; j < upperBound + 1; j += i) {
      arr[j] = 0
    }
  }
  const answer = arr.slice(n + 1).reduce((a, b) => a + b)
  return answer
}

for (let i = 0; i < input.length - 1; i++) {
  console.log(solution(input[i]))
}
