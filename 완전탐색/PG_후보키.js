const combinationDFS = (visited, arr, index, depth, search, result, pool) => {
  if (depth === search) {
    result.push([...pool])
    return
  }
  for (let i = index; i < visited.length; i++) {
    visited[i] = true
    pool.push(arr[i])
    combinationDFS(visited, arr, i + 1, depth + 1, search, result, pool)
    visited[i] = false
    pool.pop()
  }
}

const checkIsUnique = (columnList, relation) => {
  const searched = []
  relation.forEach((aRelation) => {
    let compressed = ''
    for (const column of columnList) {
      compressed += aRelation[column]
    }
    searched.push(compressed)
  })
  //유일성통과
  const searchedSet = new Set(searched)
  //하나 빼고 했는데도 유일성이 유지된다면 false
  if (searched.length === searchedSet.size) return true
  return false
}

function solution(relation) {
  //해당 컬럼을 기준으로 유일한 값들을 지니고 있는지 파악하면 해당 컬름은 유일하다.
  var answer = 0
  const candidateKeys = []
  const visited = new Array(relation[0].length).fill(false)
  const columnArr = Array.from({ length: visited.length }, (_, i) => i)
  const allColumnCombination = []
  const pool = []
  //모든 컬럼 조합 구하기- 겹치지 않음
  for (let search = 1; search < visited.length + 1; search++) {
    combinationDFS(visited, columnArr, 0, 0, search, allColumnCombination, pool)
  }
  allColumnCombination.forEach((aCombi) => {
    const isUnique = checkIsUnique(aCombi, relation)
    if (isUnique) candidateKeys.push(aCombi)
  })
  //유일성 통과한 것들 중 최소성을 찾는다.겹치지 않는 녀석들
  candidateKeys.forEach((key) => {
    //최소성 통과해보기
    //길이가 1이면 최소임 그러니까 노상관
    if (key.length === 1) {
      answer++
      return
    }
    //하나씩 빼보기
    let isMinimum = true
    for (let i = 0; i < key.length; i++) {
      const tempKey = [...key.slice(0, i), ...key.slice(i + 1)]
      const isUnique = checkIsUnique(tempKey, relation)
      //하나 빼고 했는데도 유일성이 유지된다면 false
      if (isUnique) isMinimum = false
    }
    if (isMinimum) {
      answer++
    }
  })
  return answer
}

console.log(
  solution([
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ]),
)
