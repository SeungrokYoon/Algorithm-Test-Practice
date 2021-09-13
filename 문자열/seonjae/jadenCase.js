// 내 풀이
function solution(s) {
    s = s.toLowerCase();
    const splitedCase = s.split(" ");
    const answer = splitedCase.reduce((pre, string) => {
        if (string === "") return pre;
        
        const res = string[0].toUpperCase() + string.slice(1);
        
        return (pre += `${res} `);
    }, "");
    
    return answer.trimEnd();
}

// 다른풀이
function solution(s) {
  return s
    .split(" ")
    .map((text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase())
    .join(" ");
}
