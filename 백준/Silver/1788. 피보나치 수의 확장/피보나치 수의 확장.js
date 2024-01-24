const input = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

function* fibonacci(n) {
  let x = BigInt(0)
  let y = BigInt(1)
  if (n === 0) yield 0
  if (n === 1) yield 1
  let counter = 2
  while (true) {
    if (counter++ < n) {
      ;[x, y] = [y, (x + y) % BigInt(1000000000)]
      continue
    }
    yield (x + y) % BigInt(1000000000)
  }
}

function solution(n) {
  const answerArr = []
  const ABS = Math.abs(n)
  const fiboGeneratorObj = fibonacci(ABS)
  const fiboNum = fiboGeneratorObj.next().value.toString()
  answerArr.push(n === 0 ? 0 : input < 0 && ABS % 2 === 0 ? -1 : 1)
  answerArr.push(fiboNum)
  return answerArr.join('\n')
}

console.log(solution(input))
