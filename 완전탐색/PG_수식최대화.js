const permutationDFS = (visited, arr, index, depth, find, result, pool) => {
  if (depth === find) {
    result.push([...pool])
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue
    visited[i] = true
    pool.push(arr[i])
    permutationDFS(visited, arr, i + 1, depth + 1, find, result, pool)
    visited[i] = false
    pool.pop()
  }
}

function solution(expression) {
  //스택을 이용한 연산자 우선계산
  const operatorPermutation = new Set(expression.match(/[-+*]/g))
  var answer = 0
  //주어진 연산자 찾기
  const result = []
  const pool = []
  const visited = new Array(expression.length).fill(false)
  permutationDFS(visited, [...operatorPermutation], 0, 0, operatorPermutation.size, result, pool)
  //연산자 우선순위 대로 결과 내기
  const numStack = []
  const operatorStack = []
  let numPool = ''
  for (const char of expression) {
    if (operatorPermutation.includes(char)) {
      //operator 인경우
      operatorStack.push(char)
      numStack.push(Number(numPool.join('')))
      numPool = ''
    } else {
      //숫자인경우
      numPool += char
    }
  }
  console.log(numStack, operatorStack)

  return answer
}
