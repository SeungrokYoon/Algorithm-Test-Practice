// 내 풀이
function solution1(s) {
  s = s.toLowerCase();
  const splitedCase = s.split(" ");
  const answer = splitedCase.reduce((pre, string) => {
    if (string === "") return pre + " ";

    const res = string[0].toUpperCase() + string.slice(1);

    return (pre += `${res} `);
  }, "");

  return answer;
}

// 다른풀이
function solution(s) {
  return s
    .split(" ")
    .map(
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
    .join(" ");
}

//엣지 케이스 오류

//고친 풀이
const jadenCase = (string) => {
  if (string === "") return "";

  return string[0].toUpperCase() + string.slice(1);
};

function solution(s) {
  return s
    .toLowerCase()
    .split(" ")
    .map(jadenCase)
    .join(" ");
}
