// 내가 푼 방식(문제가 있음...)
function solution(s) {
  let answer = '';
  let str = '';
  const num_string = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  
  for (let i=0; i<s.length; i++) {
      if (parseInt(s[i])){
          answer += s[i];
      }
      else {
          str += s[i];
          if(str.length > 2){
              for(let j=0; j < num_string.length; j++) {
                  if(num_string[j] === str){
                      answer += j.toString();
                      str = '';
                  }
              }
          }
      }
  };
  answer = parseInt(answer)
  return answer;
}

// 구글링해서 찾은 풀이 중 쉽고 간단한 방식
function solution(s) {
  let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  var answer = s;

  for(let i = 0; i < numbers.length; i++) {
      let arr = answer.split(numbers[i]);
      answer = arr.join(i);
  }

  return Number(answer);
}
