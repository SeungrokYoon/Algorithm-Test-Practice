// 테스트 코드 ref : https://www.acmicpc.net/source/57331146
// 답안 출처: hagtfms
let count = 0
// 3X3 크기의 박스에 대해서 인덱스를 명시하는 2차원 배열. 완성된 모습은 다음과 같다.
/**
 *
0 0 0 1 1 1 2 2 2
0 0 0 1 1 1 2 2 2
0 0 0 1 1 1 2 2 2
3 3 3 4 4 4 5 5 5
3 3 3 4 4 4 5 5 5
3 3 3 4 4 4 5 5 5
6 6 6 7 7 7 8 8 8
6 6 6 7 7 7 8 8 8
6 6 6 7 7 7 8 8 8
 *
 */
let boxIndexArr = Array(9)
  .fill()
  .map((v) => Array(9).fill(0))

// board의 (5,5) cell은, boxIndexArrr에서 보면, 4번 박스에 있는 셈이다.
// numCounterByBoxGroup 2차원 배열은, boxIndexArr와, board에 저장된 수를 가지고 검증을 진행한 결과를 기록하는 배열이다.
/**
 * 가령, board의 (5,5)에 9라는 수가 입력되어 있는경우,
 * boxCheck에서는 boxIndex의 (5,5)위치인 4를 row로,  9를 column으로 하는 위치에 이미 차 있다는 1을 표시한다.
 * 이를 통해서 우리는 boxCheck의 각 row는, 3X3 박스에 들어오는 수인 1~9의 존재여부를 저장한 배열임을 알 수 있다.
 * boxCheck의 1~9인덱스가 1로 다 채워졌다면, 해당 box는 스도쿠의 규칙 중, 3X3 내부에 1~9까지의 수가 한 번만 사용된 것을 만족하는 것이다.
 */

let numCounterByBoxGroup = Array(9)
  .fill()
  .map((v) => Array(10).fill(0))
//rowCheck
let rowCheck = Array(9).fill(0)
//얘는 왜 column이 10개지?
let columnCheck = Array(9)
  .fill()
  .map((v) => Array(10).fill(0))

//10자리 배열인데, 각 배열에는 1 2 4 8 16 으로 2의 제곱수가 들어간다.
const bit = Array(10)
  .fill()
  .map((v, i) => Math.pow(2, i))

function preprocess(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      //boxIndexArr를 초기화
      boxIndexArr[i][j] = index
      if (board[i][j]) {
        //이미 채워져 있는 숫자들의 존재를 numCounterByBoxGroup
        numCounterByBoxGroup[boxIndexArr[i][j]][board[i][j]] = 1
        /**
         * 가령 i=0일 때,  첫 번째 행에서 등장하는 모든 수의 개수를 우리는 비트연산으로 기록할 수 있다.
         * 1 = 2**1, 2= 2**2... 배열 'bit'는 그것을 위한 작업이다.
         * 그래서, 첫 번째 행의 스도쿠 숫자들이 0 3 5 4 6 9 2 7 8이라면,
         * row[0]은 1020에 해당하는 십진법 숫자이고, 이는 1111111100 의 2진법숫자이다.
         * 의미는, row[0]에는 1이 없다!(2**1)의 비트 자리가 0이기 때문에!
         */
        rowCheck[i] |= bit[board[i][j]]
        columnCheck[j][board[i][j]] = 1
        count += 1
      }
    }
  }
}

function fillBoard(board, i, j, num) {
  // num이라는 수를 board의 [i][j]에 대입
  board[i][j] = num
  // rowCheck[i]의 비트를 채워줘....
  rowCheck[i] |= bit[num]
  // columnCheck에서도 채워줘....
  columnCheck[j][num] = 1
  // 박스도 채워줘...
  numCounterByBoxGroup[boxIndexArr[i][j]][num] = 1
  count += 1
  // 채우고 나서 solver로 체크해봤는데 정답이면 그만!
  if (solver(board)) return true
  // 시도 해봤으면 이제 원상복귀 시켜줘~
  board[i][j] = 0
  // XOR연산자 진행. 해당 비트 뺴줘~
  rowCheck[i] ^= bit[num]
  columnCheck[j][num] = 0
  numCounterByBoxGroup[boxIndexArr[i][j]][num] = 0
  count -= 1
  return false
}

function solver(board) {
  //모두 조건을 만족해서 채워졌으면 끝
  if (count == 81) {
    return true
  }
  //그렇지 않다면 재귀
  // row에 수를 넣어보면서 재귀를 시도
  for (let i = 0; i < 9; i++) {
    for (let k = 1; k < 10; k++) {
      //만약 이미 rowCheck에서 1인 자리의 비트와 &연산을 하게되면 0이 아닌 무언가가 나오니 true판정.
      //즉, 수가 겹친다는 이야기니 continue
      if (rowCheck[i] & bit[k]) continue
      let n = 0,
        t = 0
      for (let j = 0; j < 9; j++) {
        if (!board[i][j] && !columnCheck[j][k] && numCounterByBoxGroup[boxIndexArr[i][j]][k]) {
          n = j
          t++
        }
      }

      if (!t) return false
      if (t == 1) {
        return fillBoard(board, i, n, k)
      }
    }
  }

  // column에 수를 넣어보면서 재귀를 시도
  for (let i = 0; i < 9; i++) {
    for (let k = 1; k < 10; k++) {
      if (columnCheck[i][k]) continue
      let n = 0,
        t = 0
      for (let j = 0; j < 9; j++) {
        if (!board[j][i] && !(rowCheck[j] & bit[k]) && numCounterByBoxGroup[boxIndexArr[j][i]][k]) {
          n = j
          t++
        }
      }

      if (!t) return false
      if (t == 1) {
        return fillBoard(board, n, i, k)
      }
    }
  }

  //box에 맞는 수를 넣어보면서 재귀를 시도
  for (let i = 0; i < 9; i++) {
    for (let k = 1; k < 10; k++) {
      if (numCounterByBoxGroup[i][k]) continue
      let row = Math.floor(i / 3) * 3,
        col = (i % 3) * 3,
        nr = 0,
        nc = 0,
        t = 0
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (
            !board[row + r][col + c] &&
            !(rowCheck[row + r] & bit[k]) &&
            !columnCheck[col + c][k]
          ) {
            nr = row + r
            nc = col + c
            t++
          }
        }
      }

      if (!t) return false
      if (t == 1) {
        return fillBoard(board, nr, nc, k)
      }
    }
  }

  //cell check
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j]) continue
      let n = 0,
        t = 0
      for (let k = 1; k < 10; k++) {
        if (
          !(rowCheck[i] & bit[k]) &&
          !columnCheck[j][k] &&
          numCounterByBoxGroup[boxIndexArr[i][j]][k]
        ) {
          n = k
          t++
        }
      }

      if (!t) return false
      if (t == 1) {
        return fillBoard(board, i, j, n)
      }
    }
  }

  //fill front first
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j]) continue
      for (let k = 1; k < 10; k++) {
        if (
          !(rowCheck[i] & bit[k]) &&
          !columnCheck[j][k] &&
          numCounterByBoxGroup[boxIndexArr[i][j]][k]
        ) {
          let result = fillBoard(board, i, j, k)
          if (result) return true
        }
      }
      return false
    }
  }
  return false
}

let board = require('fs')
  .readFileSync('test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((x) => x.split(' ').map(Number))

preprocess(board)
solver(board)
console.log(board.map((v) => v.join(' ')).join('\n'))
