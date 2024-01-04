const N = +require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const visited = Array(N + 1).fill(Infinity)
const TARGET = 1

const solution = (n) => {
  const queue = [[n, 0, n.toString()]]
  const visited = Array(n + 1).fill(0)
  while (queue.length) {
    const [num, currTry, pathStr] = queue.shift()
    visited[num] = 1
    if (num === TARGET) {
      return currTry + '\n' + pathStr
    }
    if (num % 3 === 0 && !visited[num / 3]) {
      queue.push([num / 3, currTry + 1, pathStr + ' ' + num / 3])
    }
    if (num % 2 === 0 && !visited[num / 2]) {
      queue.push([num / 2, currTry + 1, pathStr + ' ' + num / 2])
    }
    if (num - 1 >= 1 && !visited[num - 1]) {
      queue.push([num - 1, currTry + 1, pathStr + ' ' + (num - 1)])
    }
  }
}

console.log(solution(N))

//
