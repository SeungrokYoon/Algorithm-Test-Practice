const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const personToHouse = Array.from({ length: 1 + N }, () => 0)
input[1]
  .split(' ')
  .map(Number)
  .forEach((person, i) => (personToHouse[person] = i + 1))

const solution = (originalArr, L, R) => {
  //L,R까지 조합을 만들어서 가장 큰 혜택을 주는 조합을 찾기
  const ORIGINAL_TAX_SUM = originalArr
    .map((house, person) => house * person)
    .slice(L, R + 1)
    .reduce((acc, curr) => {
      return acc + curr
    }, 0)
  const permuResult = []
  const pool = []
  const partialArr = originalArr.slice(L, R + 1)
  const visited = Array.from({ length: partialArr.length + 1 }, () => 0)
  const permu = (currDepth, targetDepth) => {
    if (currDepth === targetDepth) {
      let person = L
      const taxSum = pool.reduce((acc, house) => {
        return acc + house * person++
      }, 0)
      ORIGINAL_TAX_SUM < taxSum ? permuResult.push([taxSum, pool.join(' ')]) : ''
      return
    }
    for (let i = 0; i < partialArr.length; i++) {
      if (visited[i]) continue
      visited[i] = 1
      pool.push(partialArr[i])
      permu(currDepth + 1, targetDepth)
      visited[i] = 0
      pool.pop()
    }
  }
  permu(0, R - L + 1)
  if (permuResult.length === 0) return originalArr.slice(1).join(' ')
  const largest = permuResult.sort((a, b) => b[0] - a[0])[0]
  const newHouses = largest[1].split(' ').map(Number)
  const answerArr = [...originalArr]
  let person = L
  let houseIdx = 0
  while (person <= R) {
    answerArr[person++] = newHouses[houseIdx++]
  }
  return answerArr.slice(1).join(' ')
}

const solution2 = (originalArr, L, R) => {
  //L,R까지 조합을 만들어서 가장 큰 혜택을 주는 조합을 찾기
  const ORIGINAL_TAX_SUM = originalArr
    .map((house, person) => house * person)
    .slice(L, R + 1)
    .reduce((acc, curr) => {
      return acc + curr
    }, 0)
  let person = L
  const sorted = originalArr.slice(L, R + 1).sort((a, b) => a - b)
  const maxSum = sorted.reduce((acc, curr) => {
    return acc + curr * person++
  }, 0)
  if (ORIGINAL_TAX_SUM < maxSum) {
    const arr = [...originalArr]
    for (let i = L; i < R + 1; i++) {
      arr[i] = sorted[i - L]
    }
    return arr
      .map((person, house) => [person, house])
      .sort((a, b) => a[0] - b[0])
      .map(([, house]) => house)
      .slice(1)
      .join(' ')
  } else {
    return input[1]
  }
}

const answer = input.slice(3).map((l) => {
  const [L, R] = l.split(' ').map(Number)
  return solution2(personToHouse, L, R)
})

console.log(answer.join('\n'))
