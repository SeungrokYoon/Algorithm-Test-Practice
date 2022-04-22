//균형잡힌 문자열 찾기
const getBalancedUV = (str) => {
  let numOfOpenParen = 0
  let numOfCloseParen = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      numOfOpenParen++
    } else {
      numOfCloseParen++
    }
    if (numOfOpenParen === numOfCloseParen) {
      return { u: str.substr(0, i + 1), v: str.substr(i + 1) }
    }
  }
}

//올바른 문자열인지 확인
const isCorrect = (str) => {
  if (str[0] === ')') return false
  const stack = []
  for (const paren of str) {
    const top = stack[stack.length - 1]
    if (top === '(' && paren === ')') {
      stack.pop()
      continue
    }
    stack.push(paren)
  }
  if (stack.length) return false
  return true
}

//
const recursion = (str) => {
  let result = ''
  if (str === '') return ''
  const { u, v } = getBalancedUV(str)
  const isUCorrect = isCorrect(u)
  if (isUCorrect) {
    result = u + recursion(v)
    return result
  }
  result += '('
  result += recursion(v)
  result += ')'
  for (let i = 1; i < u.length - 1; i++) {
    result += u[i] === '(' ? ')' : '('
  }
  return result
}

function solution(p) {
  if (p === '') return ''
  var answer = ''
  answer = recursion(p)
  return answer
}

console.log(solution('(()())()'))
