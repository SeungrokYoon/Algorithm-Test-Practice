// const [n, ...strings] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
const [n, ...strings] = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
const arr = strings.map((i) => i.split(' ').map((num) => +num))

const validateMatrix = (n, x, y) => {
  if (0 <= x && 0 <= y && x < n && y < n) return true
  return false
}

const solution = (n, graph) => {
  let answer = 0
  const dx = [1, 0, -1, 0] // 우 하 좌 상
  const dy = [0, 1, 0, -1]
  let height = 0
  let subAnswer = -1
  const subTask = (n, height) => {
    const visitedArray = new Array(n).fill(0).map((num) => new Array(n).fill(num))
    //각 좌표별로 BFS
    let safeSpaceCounter = 0
    for (let startY = 0; startY < n; startY++) {
      for (let startX = 0; startX < n; startX++) {
        if (visitedArray[startY][startX] || graph[startY][startX] <= height) continue
        safeSpaceCounter += 1
        const queue = []
        let queuePointer = 0
        queue.push([startY, startX])
        visitedArray[startY][startX] = 1
        while (queuePointer < queue.length) {
          const [y, x] = queue[queuePointer]
          for (let i = 0; i < 4; i++) {
            const newY = y + dy[i]
            const newX = x + dx[i]
            if (
              validateMatrix(n, newX, newY) &&
              !visitedArray[newY][newX] &&
              graph[newY][newX] > height
            ) {
              visitedArray[newY][newX] = 1
              queue.push([newY, newX])
            }
          }
          queuePointer += 1
        }
      }
    }
    return safeSpaceCounter
  }

  while (subAnswer != 0) {
    subAnswer = subTask(n, height)
    answer = Math.max(answer, subAnswer)
    height += 1
  }

  return answer
}

console.log(solution(+n, arr))
