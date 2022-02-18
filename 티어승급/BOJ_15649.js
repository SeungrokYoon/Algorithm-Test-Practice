const [N, M] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

//이 문제는 순열 nPr을 물어보는 문제
const solution = () => {
  const numArr = Array.from({ length: N }, (_, index) => index + 1)
  function permutation(arr, selectNum) {
    let result = []
    if (selectNum === 1) return arr.map((v) => [v])

    arr.forEach((v, idx, arr) => {
      const fixer = v
      const restArr = arr.filter((_, index) => index !== idx)
      const permuationArr = permutation(restArr, selectNum - 1)
      const combineFixer = permuationArr.map((v) => [fixer, ...v])
      result.push(...combineFixer)
    })
    return result
  }
  const result = permutation(numArr, M)
  result.forEach((permu) => {
    console.log(permu.join(' '))
  })
}

solution()
