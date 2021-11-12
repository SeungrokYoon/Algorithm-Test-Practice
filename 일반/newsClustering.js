// 뉴스 클러스터링
// 링크: https://programmers.co.kr/learn/courses/30/lessons/17677?language=javascript

function solution(str1, str2) {
  const answer = 0;
  const newStr1 = str1.toLowerCase().replace(/[^a-z]/gi, '');
  const newStr2 = str2.toLowerCase().replace(/[^a-z]/gi, '');
  const arr1 = [];
  const arr2 = [];
  const dic1 = {};
  const dic2 = {};

  for (let i = 0; i < newStr1.length - 1; i++) {
    const key = newStr1.slice(i, i + 2);
    arr1.push(key);
  }
  for (let i = 0; i < newStr2.length - 1; i++) {
    const key = newStr2.slice(i, i + 2);
    arr2.push(key);
  }
  arr1.forEach((word) => {
    dic1[word] = (dic1[word] || 0) + 1;
  });
  arr2.forEach((word) => {
    dic2[word] = (dic2[word] || 0) + 1;
  });

  console.log(newStr1, arr1, dic1);
  return answer;
}
