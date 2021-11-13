// 뉴스 클러스터링
// 링크: https://programmers.co.kr/learn/courses/30/lessons/17677?language=javascript

function solution(str1, str2) {
  let answer = 0;
  const newStr1 = str1.toLowerCase();
  const newStr2 = str2.toLowerCase();

  const arr1 = [];
  const arr2 = [];
  const dic1 = {};
  const dic2 = {};
  const result = {};
  //arr에 push 될 때, 공백 및 특수문자가 걸러짐
  for (let i = 0; i < newStr1.length - 1; i++) {
    const key = newStr1.slice(i, i + 2);
    key.match(/[^a-z]/gi) ? '' : arr1.push(key);
  }
  for (let i = 0; i < newStr2.length - 1; i++) {
    const key = newStr2.slice(i, i + 2);
    key.match(/[^a-z]/gi) ? '' : arr2.push(key);
  }

  //둘 다 공집합일 경우 예외처리
  if (!(arr1.length || arr2.length)) return 1 * 65536;

  arr1.forEach((word) => {
    dic1[word] = (dic1[word] || 0) + 1;
  });
  arr2.forEach((word) => {
    dic2[word] = (dic2[word] || 0) + 1;
  });

  for (let word of Object.keys(dic1)) {
    if (word in dic2) {
      //교집합의 개수를 구하는 중.
      answer += Math.min(dic1[word], dic2[word]);
    }
  }
  const jakard = parseInt(
    (answer * 65536) / (arr1.length + arr2.length - answer)
  );
  return jakard;
}
