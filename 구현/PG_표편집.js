function solution(n, k, cmd) {
  var answer = ''
  const checkList = new Array(n).fill('O')
  const linkedList = {}
  const LEFTEND = -1
  const RIGHTEND = n
  for (let i = 0; i < n; i++) {
    linkedList[i] = { prev: i - 1, next: i + 1 }
  }
  const deleted = []
  for (const command of cmd) {
    const commandType = command[0]
    if (commandType === 'U') {
      const move = Number(command.split(' ')[1])
      for (let i = 0; i < move; i++) {
        k = linkedList[k].prev
      }
    } else if (commandType === 'D') {
      const move = Number(command.split(' ')[1])
      for (let i = 0; i < move; i++) {
        k = linkedList[k].next
      }
    } else if (commandType === 'C') {
      const { prev, next } = linkedList[k]
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
    } else {
      const { prev, next, now } = deleted.pop()
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
