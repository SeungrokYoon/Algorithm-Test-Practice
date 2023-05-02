// S4: 다리놓기 https://www.acmicpc.net/problem/1010

/**
 * 다리가 서로 겹치지 않는 다는 것은, 다리에 순서가 이미 존재한다는 의미와 동일함으로 이해
 * 따라서 조합 문제로 판단
 * 그리고 조합의 배열을 구하는 것이 아닌, 조합의 개수를 구하는 문제이므로 파스칼의 삼각형을 이용했음.
 * 하지만 이 풀이는 시간초과
 * 따라서 단순공식을 적용했다.
 *
 * 하지만 25%에서 자꾸 런타임에러가 났다. 그래서 질문을 찾아본 결과 realine을 사용하란다.
 *
 * readline을 사용했더니 이제는 스택 사이즈가 부족하다는 런타임 에러가 났다.
 *
 * 그래서 결국 재귀 방식의 팩토리얼을 포기하고, for문으로 팩토리얼값을 구했다.
 *
 * 그랬더니 25%에서 틀렸단다.
 * 13 29 의 값이 자바스크립트에서는
 * 67863914.99999999 로 나온다. 이를 parseInt했으니 67863914 가 나와서 안될일이다.
 * 그렇다면 어떻게 해야 좋을까?
 *
 * toFixed (문자열반환) + 단항연산자를 활용하자.
 */

const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const getFactorial = (n) => {
  let result = 1
  for (let i = 1; i <= n; i++) {
    result *= i
  }
  return result
}

const combination = (n, m) => {
  return +(getFactorial(n) / getFactorial(n - m) / getFactorial(m)).toFixed()
}

const input = []
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number))
})

rl.on('close', () => {
  const answer = input.reduce((prev, [r, n], index) => {
    if (index === 0) return prev
    return (prev += combination(n, r) + '\n')
  }, '')
  console.log(answer.trim())
  process.exit()
})
