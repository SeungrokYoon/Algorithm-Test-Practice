function solution(s) {
  // 테스트 통과에 실패한 내 코드
  // 패인: 같은 문자가 연달아 있다면 1만 추가해줘야 하는데 양 옆의 문자만 비교해서 그 케이스를 잡을 수가 없었다.

  let answer = 1;

  for (let i = 1; i < s.length - 1; i++) {
    let inc = 1;
    let curPalindrome = 1;

    if (s[i - 1] !== s[i + 1]) continue;

    while (s[i - inc] === s[i + inc]) {
      curPalindrome += 2;
      inc++;
      if (!s[i + inc]) break;
    }

    if (curPalindrome === s.length) return curPalindrome;
    if (curPalindrome > answer) answer = curPalindrome;
  }

  return answer;
}

console.log(solution("abcdcba")); // 7
console.log(solution("abacde")); // 3
console.log(solution("a")); // 1
console.log(solution("abcde")); // 1
console.log(solution("aa")); // 기대값: 2 / 내 코드 결과: 1
console.log(solution("aaaa")); // 기대값: 4 / 내 코드 결과: 3

// 모든 케이스 통과한 다른 분의 코드
// 해당 값 자체가 팰린드롬인 경우부터 거꾸로 탐색

function solutionSuccess(s) {
  for (let leng = s.length; leng > 1; leng--) {
    for (let start = 0; start + leng <= s.length; start++) {
      let check = true;

      for (let i = 0; i < leng / 2; i++) {
        if (s[start + i] !== s[start + leng - i - 1]) {
          check = false;
          break;
        }
      }

      if (check) return leng;
    }
  }

  return 1;
}
