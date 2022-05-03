function solution(n, k, cmd) {
  var answer = ''
  const checkList = new Array(n).fill('O')
  const linkedList = {}
  const LEFTEND = -1
  const RIGHTEND = n
  let move = 0,
    prev = 0,
    next = 0,
    now = 0,
    deletedRow = null
  for (let i = 0; i < n; i++) {
    linkedList[i] = { prev: i - 1, next: i + 1 }
  }
  const deleted = []
  for (const command of cmd) {
    const commandType = command[0]
    switch (commandType) {
      case 'U':
        move = Number(command.split(' ')[1])
        for (let i = 0; i < move; i++) {
          k = linkedList[k].prev
        }
        break
      case 'D':
        move = Number(command.split(' ')[1])
        for (let i = 0; i < move; i++) {
          k = linkedList[k].next
        }
        break
      case 'C':
        prev = linkedList[k].prev
        next = linkedList[k].next
        deleted.push({ prev, next, now: k })
        checkList[k] = 'X'
        if (next === RIGHTEND) {
          k = linkedList[k].prev
        } else {
          k = linkedList[k].next
        }
        if (prev === LEFTEND) {
          //선택된 행이 맨 위의 행임
          linkedList[next].prev = prev
        } else if (next === RIGHTEND) {
          //선택된 행이 맨 아래 행임
          linkedList[prev].next = next
        } else {
          linkedList[prev].next = next
          linkedList[next].prev = prev
        }
        break
      default:
        deletedRow = deleted.pop()
        prev = deletedRow.prev
        next = deletedRow.next
        now = deletedRow.now
        checkList[now] = 'O'
        if (prev === LEFTEND) {
          linkedList[next].prev = now
        } else if (next === RIGHTEND) {
          linkedList[prev].next = now
        } else {
          linkedList[prev].next = now
          linkedList[next].prev = now
        }
    }
  } //for
  answer = checkList.join('')
  return answer
} //solution

console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']))
