function translateToNum(str) {
  switch (str) {
    case "zero":
      str = "0"
      break
    case "one":
      str = "1"
      break
    case "two":
      str = "2"
      break
    case "three":
      str = "3"
      break
    case "four":
      str = "4"
      break
    case "five":
      str = "5"
      break
    case "six":
      str = "6"
      break
    case "seven":
      str = "7"
      break
    case "eight":
      str = "8"
      break
    case "nine":
      str = "9"
      break
    default:
      return false
  }
  return str
}

function solution(s) {
  let tempArr = []
  const result = []
  const regExp = /\d/
  for (let char of s) {
    if (!regExp.test(char)) {
      // char가 문자일 때
      tempArr.push(char) // 임시 배열에 문자 쌓아주고
      if (tempArr.length > 0) {
        // 배열이 비어있지 않으면
        const tempNum = tempArr.join("") // join해서 문자열 만들고
        const translatedNum = translateToNum(tempNum) // 문자열 숫자로 변경 일치하는 문자열이 없으면 false 값이 됨
        if (translatedNum) {
          // 일치하는 문자열이 있으면
          result.push(translatedNum) // 결과배열에 push
          tempArr = [] // 임시 배열 비워줌
        }
      }
    } else {
      //char가 숫자
      result.push(char) // 그대로 결과 배열에 push
      tempArr = [] // 임시 배열 비워줌
    }
  }
  return parseInt(result.join(""))
}

// 프로그래머스에서 본 다른 사람의 풀이
/*
function solution(s) {
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var answer = s;
    one44seveneight
    for(let i=0; i< numbers.length; i++) {
        let arr = answer.split(numbers[i]); // i=1 에서 one 기준으로 split => ['','4seveneight]
        answer = arr.join(i); // 두개를 i로 구분해서 join 하면 14seveneight ->반복
    }

    return Number(answer);
}
*/
