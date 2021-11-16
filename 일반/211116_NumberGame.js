//코딩테스트 연습 Summer/Winter Coding(~2018) 숫자 게임
//링크 https://programmers.co.kr/learn/courses/30/lessons/12987#

function solution(A, B) {
  let answer = 0;
  const len = A.length;
  let aIndex = len - 1;
  let bIndex = len - 1;
  let count = len;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  while (count > 0) {
    if (B[bIndex] > A[aIndex]) {
      answer++;
      bIndex--;
    }
    aIndex--;
    count--;
  }

  return answer;
}
