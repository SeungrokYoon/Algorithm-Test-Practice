// 회문인 조건
// 1. 삭제안하고 맞는 경우 0
// 2. 삭제하고 맞는 경우 1
// 3. 삭제를 했지만 회문이 아닌 경우 2

// 짝수
// left + 1 === right 종료
// 짝수인데 하나 건너 뛰었을 때
// left === right 종료

// 홀수
// left === right 종료
// 홀수인데 하나 건너 뛰었을 때
// left + 1 === right 종료

// 삭제가 됐는데 건너 뛰면 종료

// 처음 나의 풀이
const fs = require("fs");
const [n, ...inputs] = fs.readFileSync("input").toString().split("\r\n");

function solution(inputs) {
  inputs.forEach((string) => {
    const len = string.length;
    const isOdd = len % 2 === 0;
    let left = 0;
    let right = len - 1;
    let isDelete = false;
    let isPalindrome = false;

    while (true) {
      //종료 조건
      if (isOdd && isDelete && left === right) {
        isPalindrome = true;
        break;
      } else if (isOdd && !isDelete && left + 1 === right) {
        isPalindrome = true;
        break;
      } else if (!isOdd && isDelete && left + 1 === right) {
        isPalindrome = true;
        break;
      } else if (!isOdd && !isDelete && left === right) {
        isPalindrome = true;
        break;
      }
      // 확인 로직
      if (string[left] === string[right]) {
        left += 1;
        right -= 1;
        continue;
      }
      if (isDelete) break;

      isDelete = true;
      if (string[left + 1] === string[right]) {
        left += 1;
      } else if (string[left] === string[right - 1]) {
        right -= 1;
      }
    }
    const result = isPalindrome ? (isDelete ? "1" : "0") : "2";
    console.log(result);
  });
}

solution(inputs);







// 두번째 내가 짠 코드
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (inputs) => {
  inputs.forEach((string) => {
    const len = string.length;
    const isEven = len % 2 === 0;
    let left = 0;
    let right = len - 1;
    let isDelete = false;
    let isPalindrome = false;
    // 1
    // abcddcdba
    while (true) {
      //종료 조건
      if (isEven && isDelete && left === right) {
        if (string[left] === string[right]) {
          isPalindrome = true;
        }
        break;
      } else if (isEven && !isDelete && left + 1 === right) {
        isPalindrome = true;
        if (string[left] !== string[right]) {
          isDelete = true;
        }
        break;
      } else if (!isEven && isDelete && left + 1 === right) {
        if (string[left] === string[right]) {
          isPalindrome = true;
        }
        break;
      } else if (!isEven && !isDelete && left === right) {
        isPalindrome = true;
        break;
      }
      // 확인 로직
      if (string[left] === string[right]) {
        left += 1;
        right -= 1;
        continue;
      }

      if (isDelete) break;

      isDelete = true;

      if (string[left + 1] === string[right]) {
        left += 1;
      } else if (string[left] === string[right - 1]) {
        right -= 1;
      }
    }

    const result = isPalindrome ? (isDelete ? "1" : "0") : "2";
    console.log(result);
  });
};

// 세번째 다른사람코드 해석 후 고침
const otherSolution = (inputs) => {
  inputs.forEach((string) => {
    //abba
    const len = string.length;
    let left = 0;
    let right = len - 1;
    let result = "0";
    const isEqual = (left, right) => string[left] === string[right];

    while (left < right) {
      if (isEqual(left, right)) {
        left += 1;
        right -= 1;
        continue;
      }

      if (!isEqual(left + 1, right) && !isEqual(left, right - 1)) {
        result = "2";
        break;
      }

      let isPalindrome = false;
      for (let k = 0; k < 2 && !isPalindrome; k++) {
        let start = left;
        let end = right;

        k === 0 ? start++ : end--;

        isPalindrome = true;

        while (start < end) {
          if (!isEqual(start++, end--)) {
            isPalindrome = false;
            break;
          }
        }
      }
      result = isPalindrome ? "1" : "2";
      break;
    }

    console.log(result);
  });
};

let isCheck = false;
let count = 0;
const inputs = [];

rl.on("line", (line) => {
  if (!isCheck) {
    isCheck = true;
    count = parseInt(line);
    return;
  }
  count--;
  inputs.push(line);
  if (count === 0) rl.close();
}).on("close", () => {
  otherSolution(inputs);
  process.exit();
});
