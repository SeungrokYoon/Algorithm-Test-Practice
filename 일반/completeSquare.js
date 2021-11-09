// 멀쩡한 삼각형
// https://programmers.co.kr/learn/courses/30/lessons/62048

// 테스트 케이스 6번이 계속 오류가 나는 코드
const solution = (w, h) => {
  let answer = 0;
  const inclination = h / w;
  for (let i = 0; i < w; i++) {
    answer += Math.floor(inclination * i) * 2;
  }
  return answer;
};

// 통과 코드
const solution = (w, h) => {
  let answer = 0;
  for (let i = 0; i < w; i++) {
    answer += Math.floor((h * i) / w) * 2;
  }
  return answer;
};
