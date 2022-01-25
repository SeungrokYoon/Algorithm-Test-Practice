const input = parseInt(
  require('fs')
    .readFileSync(__dirname + '/test.txt')
    .toString()
    .trim(),
)

const solution = (N) => {
  let count = 0
  let num = 0
  while (count < N) {
    const numStr = num.toString()
    if (numStr.length > 10) {
      console.log(-1)
      return
    }
    let isStop = false
    for (let i = 0; i < numStr.length - 1; i++) {
      if (numStr[i] > numStr[i + 1]) continue
      isStop = true
      break
    }
    if (!isStop) count++
    num++
  }
  console.log(num - 1)
}

solution(input)
