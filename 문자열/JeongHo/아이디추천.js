// 입력값 조정해서 규칙에 맞게 조정
// id length 3~15자
// 소문자, 숫자, 빼기(-) 밑줄(_) 마침표 (.) 만 가능 regexp \w \d -_.
// 마침표 (.) 처음과 끝, 연속 사용 불가 ^ 끝부분뭐더라
// 단계별로 처리
// 1단계 lowerCase
// 2단계 regexp에 맞지 않는 char 모두 제거
// 3단계 .가 2번이상 연속된 부분 1개로 치환
// 4단계 . 처음이나 끝이면 제거
// 5단계 빈 문자열, a 대입
// 6단계 길이가 >= 16 15까지만 slice 끝에 .면 제거
// 7단계 2 이하라면 마지막문자를 길이가 3이될때까지 반복
function solution(new_id) {
  const regExp2 = /[\d\w.\-_]/
  const regExp3 = /[\.]+/g
  const regExpFirst = /^\./
  const regExpLast = /\.$/
  const lId = new_id.toLowerCase()
  const tempArr = []
  // tempArr에 허용 문자만 push
  for (let char of lId) {
    if (regExp2.test(char)) tempArr.push(char)
  }
  // 다시 str으로 만들고 정규표현식 사용해서 . 연속 두개 이상인것 1개로
  const temp3 = tempArr.join("").replace(regExp3, ".")
  // 제일 처음에 오는 . 제거
  const tempFirst = temp3.replace(regExpFirst, "")
  // 제일 마지막에 . 제거
  let tempLast = tempFirst.replace(regExpLast, "")

  //길이가 문자가 없으면 a로
  if (tempLast.length === 0) {
    tempLast = "a"
  }
  // 15자 까지 잘라주고 마지막에 .이면 14자까지
  if (tempLast.length > 15) {
    console.log(tempLast)
    tempLast = tempLast.substring(0, 15)
    if (tempLast[tempLast.length - 1] === ".")
      tempLast = tempLast.substring(0, 14)
  }
  // 길이가 3이하면 3까지 마지막 문자로 늘려주기
  if (tempLast.length < 3) {
    while (tempLast.length < 3) {
      tempLast += tempLast[tempLast.length - 1]
    }
  }

  return tempLast
}
