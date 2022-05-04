function solution(n, t, m, p) {
  var answer = ''
  //2진법, 튜브가 구해야 할숫ㅅ자의 개수 t=4  2명이, 튜브의 순서 1 튜브가 말해야하는 숫자 t개...
  //최대 몇자리수까지 구해야함? t*m+튜브시작순서인 p-1까지
  //여기서는 그러면 9자리까지 구해야함.
  //0 1 10 11 100
  //^   ^  ^  ^
  let allStr = ''
  let num = 0
  while (allStr.length < t * m + p) {
    const numStr = num.toString(n).toUpperCase()
    allStr += numStr
    num++
  }
  for (let tube = p - 1; tube < t * m + p - 1; tube += m) {
    answer += allStr[tube]
  }
  return answer
}
