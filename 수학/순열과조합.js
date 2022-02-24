function combination(arr, selectNum) {
  const result = []
  if (selectNum === 1) return arr.map((v) => [v])
  arr.forEach((v, idx, arr) => {
    const fixed = v
    const restArr = arr.slice(idx + 1)
    const combinationArr = combination(restArr, selectNum - 1)
    const combineFix = combinationArr.map((v) => [fixed, ...v])
    result.push(...combineFix)
  })
  return result
}

function permutation(arr, selectNum) {
  const result = []
  if (selectNum === 1) return arr.map((v) => [v])

  arr.forEach((v, idx, arr) => {
    const fixed = v
    const restArr = arr
    const permutationArr = permutation(restArr, selectNum - 1)
    const combineFix = permutationArr.map((v) => [fixed, ...v])
    result.push(...combineFix)
  })
  return result
}

//좀 더 효율적인 순열 DFS
const solution = () => {
  const [N, M] = require('fs')
    .readFileSync('dev/stdin')
    .toString()
    .split(' ')
    .map((x) => +x)

  let output = ''
  let state = new Array(8 + 1).fill(false)
  let pool = []
  function search(deps) {
    if (deps >= M) {
      output += pool.join(' ') + '\n'
      return
    }
    for (let i = 1; i <= N; i++) {
      if (!state[i]) {
        state[i] = true
        pool.push(i)
        search(deps + 1)
        pool.pop()
        state[i] = false
      }
    }
  }
  search(0)
  console.log(output)
}

//nPr
const n = 4
const r = 3
const visited = Array.from({ length: n }, () => 0)
const permutationDFS = (index, count, r) => {
  if (count === r) {
    console.log(visited)
    return
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue
    visited[i] = 1
    permutationDFS(i, count + 1, r)
    visited[i] = 0
  }
}

//nCr
const combinationDFS = (index, count, r) => {
  if (count === r) {
    console.log(visited)
    return
  }
  for (let i = index; i < n; i++) {
    if (visited[i]) continue
    visited[i] = 1
    combinationDFS(i, count + 1, r)
    visited[i] = 0
  }
}
console.log('permutationDFS')
permutationDFS(0, 0, r)
console.log('combinationDFS')
combinationDFS(0, 0, r)
