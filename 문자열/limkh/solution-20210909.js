function solution(new_id) {
  let answer = "";
  const replacedNewId = new_id
    .toLowerCase() // 모든 문자를 소문자로 변환
    .replace(/[^a-z\d-_.]/g, "") // 소문자, 숫자, -, _, .를 제외한 문자 제거
    .replace(/[\.]{2,}/g, ".") // .가 2개 이상인 경우 하나만 남기고 제거
    .replace(/^\.|\.$/g, ""); // .로 시작하거나 .로 끝나는 경우 . 제거

  if (replacedNewId.length === 0) {
    // 새 아이디가 빈 문자열인 경우 "a" 대입
    answer = "a";
  } else if (replacedNewId.length >= 16) {
    // 새 아이디 길이가 16 이상인 경우 15자리 숫자까지만 남기고 나머지 제거
    answer = replacedNewId.substr(0, 15).replace(/\.$/, ""); // 만약 .로 끝나면 . 제거
  } else {
    answer = replacedNewId;
  }

  if (answer.length >= 3) {
    return answer;
  } else {
    // 새 아이디 길이가 2 이하일 때
    return answer + answer[answer.length - 1].repeat(3 - answer.length); // 길이가 3이 될 때까지 마지막 문자를 추가
  }
}

// 테스트 케이스
console.log(solution("...!@BaT#*..y.abcdefghijklm")); // "bat.y.abcdefghi"
console.log(solution("z-+.^.")); // "z--"
console.log(solution("=.=")); // "aaa"
console.log(solution("123_.def")); // "123_.def"
console.log(solution("abcdefghijklmn.p")); // "abcdefghijklmn"
console.log(solution("~!@#$%&*()=+[{]}:?,<>/")); // "aaa"
console.log(solution(".1.")); // "111"
