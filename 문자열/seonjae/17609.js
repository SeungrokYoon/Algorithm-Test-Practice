const fs = require("fs");
const [n, ...inputs] = fs.readFileSync("input").toString().split("\r\n");

function solution(inputs) {
  inputs.forEach((string) => {
    const len = string.length;
    // const mid = len % 2 === 0 ? len / 2 - 1 : (len - 1) / 2;
    let left = 0;
    let right = len - 1;
    let isPseudoPalindrome = false;
    // console.log(string);

    while (true) {
      if (len % 2 === 0) {
        if (isPseudoPalindrome) {
          if (left === right) {
            console.log(1);
            break;
          }
        } else {
          if (Math.abs(left - right) === 1) {
            if (string[left] === string[right]) {
              console.log(1);
            } else {
              console.log(2);
            }
            break;
          }
        }
      } else {
        if (isPseudoPalindrome) {
          if (Math.abs(left - right) === 1) {
            if (string[left] === string[right]) {
              console.log(1);
            } else {
              console.log(2);
            }
            break;
          }
        } else {
          if (left === right) {
            console.log(0);
            break;
          }
        }
      }

      if (string[left] === string[right]) {
        // console.log(string[left], string[right]);
        left++;
        right--;
        continue;
      }

      if (isPseudoPalindrome) {
        console.log(2);
        break;
      }

      if (string[left] === string[right - 1]) {
        // console.log(string[left], string[right - 1]);
        left++;
        right -= 2;
        isPseudoPalindrome = true;
      } else if (string[left + 1] === string[right]) {
        // console.log(string[left + 1], string[right]);
        left += 2;
        right--;
        isPseudoPalindrome = true;
      } else {
        console.log(2);
        break;
      }
    }
  });
}

solution([...inputs]);
