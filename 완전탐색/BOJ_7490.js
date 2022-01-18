const [, ...arr] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((i) => +i)

const solution = (arr) => {
  const getEquations = (n) => {
    const result = []
    const queue = [{ str: '1', lastNum: 1, subSum: 1 }]
    let queuePointer = 0
    while (queue[queuePointer].str.length < 2 * n - 1) {
      const { str, lastNum, subSum } = queue[queuePointer]
      const nextNumber = Math.abs(lastNum % 10) + 1
      if (subSum + nextNumber === 0 && str.length + 2 == 2 * n - 1)
        result.push(str + `+${nextNumber}`)
      if (subSum - nextNumber === 0 && str.length + 2 == 2 * n - 1)
        result.push(str + `-${nextNumber}`)
      if (subSum + -1 * lastNum + lastNum * 10 + nextNumber === 0 && str.length + 2 == 2 * n - 1)
        result.push(str + ` ${nextNumber}`)

      const plus = {
        str: str + `+${nextNumber}`,
        lastNum: 1 * nextNumber,
        subSum: subSum + nextNumber,
      }
      const minus = {
        str: str + `-${nextNumber}`,
        lastNum: -1 * nextNumber,
        subSum: subSum - nextNumber,
      }
      const empty = {
        str: str + ` ${nextNumber}`,
        lastNum: lastNum > 0 ? lastNum * 10 + nextNumber : -1 * (-1 * lastNum * 10 + nextNumber),
        subSum:
          lastNum > 0
            ? subSum + -1 * lastNum + lastNum * 10 + nextNumber
            : subSum + -1 * lastNum + -1 * (-1 * lastNum * 10 + nextNumber),
      }
      queue.push(plus)
      queue.push(minus)
      queue.push(empty)
      queuePointer++
    }
    result.sort()
    return result
  }
  for (let i = 0; i < arr.length; i++) {
    const result = getEquations(arr[i])
    result.forEach((equation) => {
      console.log(equation)
    })
    console.log()
  }
}

solution(arr)
