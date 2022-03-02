function solution(operations) {
  const queue = []
  for (let i = 0; i < operations.length; i++) {
    const [command, num] = operations[i].split(' ')
    if (command === 'I') {
      queue.push(num * 1)
      queue.sort((a, b) => a - b)
    } else {
      if (num === '1') {
        queue.pop()
      } else {
        queue.shift()
      }
    }
  }
  if (queue.length) {
    return [queue.pop(), queue[0]]
  } else {
    return [0, 0]
  }
}
