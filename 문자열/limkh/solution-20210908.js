function solution(s) {
  let answer = 1001;
  let answerStr = "";
  let cnt = 1;
  let scope = 1;

  while (scope <= s.length) {
    for (let i = 0; i < s.length; i += scope) {
      if (s.substr(i, scope) === s.substr(i + scope, scope)) {
        cnt++;
      } else {
        answerStr += s.substr(i, scope);
        if (cnt !== 1) answerStr += cnt;
        cnt = 1;
      }
    }
    answerStr.length < answer ? (answer = answerStr.length) : answer;
    answerStr = "";
    cnt = 1;
    scope++;
  }

  return answer;
}

// 테스트 케이스
console.log(solution("aabbaccc")); // 7
console.log(solution("ababcdcdababcdcd")); // 9
console.log(solution("abcabcdede")); // 8
console.log(solution("abcabcabcabcdededededede")); // 14
console.log(solution("xababcdcdababcdcd")); // 17
console.log(solution("xxxxxxxxxxyyy")); // 5
console.log(solution("a")); // 1
console.log(
  solution(
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  )
); // 4
console.log(
  solution(
    "zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  )
); // 5
console.log(
  solution(
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxz"
  )
); // 5
