function solution(new_id) {
  const answer = new_id
    .toLowerCase() // 모든 문자를 소문자로 변환
    .replace(/[^a-z\d-_.]/g, "") // 소문자, 숫자, -, _, .를 제외한 문자 제거
    .replace(/[\.]{2,}/g, ".") // .가 2개 이상인 경우 하나만 남기고 제거
    .replace(/^\.|\.$/g, "") // .로 시작하거나 .로 끝나는 경우 . 제거
    .slice(0, 15)
    .replace(/\.$/, "");

  if (answer.length >= 3) {
    return answer;
  } else if (answer.length === 0) {
    return "aaa";
  } else {
    return answer + answer[answer.length - 1].repeat(3 - answer.length);
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
