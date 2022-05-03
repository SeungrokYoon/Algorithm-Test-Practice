const getOperatorsPermutation = () => {
  // + - * 의 우선순위 순열을 찾아냄. 총 6개가 나올 것임
  const result = []
  const pool = []
  const visited = new Array(3).fill(false)
  permutationDFS(visited, ['+', '-', '*'], 0, 0, 3, result, pool)
  return result
}

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

const getPostfixStack = (operators, givenExpression) => {
  //operators의 우선순위 대로 후위 표기법으로 변경하여 연산하기
  const stack = []
  let postFix = []
  //일단 numStack과 operatorStack으로 옮기기
  givenExpression.forEach((el) => {
    if (isNaN(el)) {
      //연산자의 경우
      if (stack.length === 0) {
        stack.push(el)
        return
      }
      while (operators.indexOf(el) <= operators.indexOf(stack[stack.length - 1])) {
        const popped = stack.pop()
        postFix.push(popped)
      }
      stack.push(el)
    } else {
      //숫자의 경우
      postFix.push(el)
    }
  })
  //스택에 남아있는 요소 추가
  while (stack.length) {
    postFix.push(stack.pop())
  }
  return postFix
}

const calculatePostFix = (postfix) => {
  const stack = []
  postfix.forEach((el) => {
    if (isNaN(el)) {
      const n2 = stack.pop()
      const n1 = stack.pop()
      if (el === '-') {
        stack.push(n1 - n2)
      } else if (el === '+') {
        stack.push(n1 + n2)
      } else {
        stack.push(n1 * n2)
      }
    } else {
      stack.push(Number(el))
    }
  })
  return Math.abs(stack[0])
}

function solution(expression) {
  //중위표기법을 후위표기법으로 변경하는 문제
  var answer = 0
  //연산자와 숫자를 분리하여 split하기
  const givenExpression = expression.match(/\d+|\D/g) //정규식으로 \d+ 숫자가 1개 이상인 문자, \D 숫자가 아닌 문자를 걸러낸다.
  const numbers = []
  const operators = []
  givenExpression.forEach((e) => {
    isNaN(e) ? operators.push(e) : numbers.push(e)
  })
  const operatorPermutation = getOperatorsPermutation()
  operatorPermutation.forEach((operators) => {
    const postFix = getPostfixStack(operators, givenExpression)
    const result = calculatePostFix(postFix)
    answer = Math.max(answer, result)
  })

  return answer
}
