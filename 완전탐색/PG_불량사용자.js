const permutationDFS = (arr, visited, index, depth, len, resultSet, pool) => {
  if (depth === len) {
    const result = [...pool]
    resultSet.add(result.join(' '))
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue
    visited[i] = true
    pool.push(arr[i])
    permutationDFS(arr, visited, i + 1, depth + 1, len, resultSet, pool)
    visited[i] = false
    pool.pop()
  }
}

const isMatch = (id, ban) => {
  if (id.length !== ban.length) return false
  for (let i = 0; i < id.length; i++) {
    //'*'가 아닌 문자이지만 id의 문자와 다름
    if (ban[i] === '*') continue
    if (id[i] !== ban[i]) return false
  }
  return true
}

const hasPossibleCombi = (result, banned_id) => {
  let isPossible = true
  for (let i = 0; i < banned_id.length; i++) {
    if (isMatch(result[i], banned_id[i])) continue
    isPossible = false
    break
  }
  return isPossible
}

//조합을 다 구해서, match 하는지 확인
function solution(user_id, banned_id) {
  var answer = new Set()
  const visited = new Array(user_id.length).fill(false)
  const resultSet = new Set()
  const pool = []
  permutationDFS(user_id, visited, 0, 0, banned_id.length, resultSet, pool)
  const resultList = [...resultSet]
  resultList.forEach((result) => {
    const splitted = result.split(' ')
    const isPossible = hasPossibleCombi(splitted, banned_id)
    if (isPossible) {
      splitted.sort()
      answer.add(splitted.join(' '))
    }
  })
  return answer.size
}
