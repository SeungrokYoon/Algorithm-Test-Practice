// 백준 입출력 처리
const [n, ...arr] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = []

// n 과 주어진 문자열의 갯수가 다르다면 Error 처리
// n * 1 은 문자열로 받아온 n 을 숫자로 변환
if (arr.length !== n * 1) 
    return 'Error'

// arr 가 배열로 들어오기 때문에 이중 for 문으로
// 입력 문자열의 갯수가 가변할탠데, 변수로 뽑기도 애해함. 
// 이중 for 문을 벗길 좋은 방법이 있을까?
for (let i = 0; i < arr.length; i++) {
    const stack = []
    let isError = false

    for (let j = 0; j < arr[i].length; j++) {
        let tmp = arr[i][j]
        if (tmp === ')') {
            // ')' 를 뽑았는데 stack 에 '(' 가 없다면 error, 하나라도 있다면 '(' 제거
            // isError 를 true 로 바꿔주고 break 로 빠져나올까 고민하게 됨 (효율성 에러가 안나서 굳이 해야하나 싶은?)
            // break 사용해보기!
            // stack.length === 0 ? isError = true : stack.pop()
            if (stack.length === 0) {
                isError = true
                break;
            }
            else {
                stack.pop()
            }
            // 3항연산자 바로바로 쓸 수 있도록 연습
        }
        else {
            // ')' 가 아니라면 stack 에 넣어줌
            stack.push(tmp)
        }
    }
    // 루프를 돌았을 때 stack 에는 아무것도 없어야 'YES'
    if (stack.length !== 0 || isError) {
        answer.push('NO')
    }
    else if (stack.length === 0) {
        answer.push('YES')
    }
}

console.log(...answer)


// https://www.acmicpc.net/problem/9012