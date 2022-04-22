const binarySearch = (arr, key) => {
  let start = 0
  let end = arr.length - 1
  const mid = Math.floor((start + end) / 2)
  if (arr[mid] === key) {
    return mid
  } else if (arr[mid] > key) {
    end = mid - 1
  } else {
    start = mid + 1
  }
  return -1
}

function solution(n, k, cmd) {
  var answer = ''
  const totalDeletedStack = []
  //오름차순정렬
  let sortedDeletedStack = []
  let selectedIndex = k
  let lastIndex = n - 1
  const arr = Array.from({ length: n }, () => 'O')
  for (const command of cmd) {
    const commandType = command[0]
    if (commandType === 'U') {
      const move = Number(command.split(' ')[1])
      let nextIndex = selectedIndex + move
      let isPossible = false
      //binarySearch 로 못 찾으면 놓을 수 있는 위치
      //있으면 nextIndex++해서 찾기
      while (!isPossible) {
        const result = binarySearch(sortedDeletedStack, nextIndex)
        if (result < 0) {
          selectedIndex = nextIndex
          isPossible = true
        } else {
          nextIndex++
        }
      }
    } else if (commandType === 'D') {
      const move = Number(command.split(' ')[1])
      let nextIndex = selectedIndex - move
      let isPossible = false
      //binarySearch 로 못 찾으면 놓을 수 있는 위치
      //있으면 nextIndex--해서 찾기
      while (!isPossible) {
        const result = binarySearch(sortedDeletedStack, nextIndex)
        if (result < 0) {
          selectedIndex = nextIndex
          isPossible = true
        } else {
          nextIndex--
        }
      }
    } else if (commandType === 'C') {
      arr[selectedIndex] = 'X'
      let isPossible = false
      let isLastNumIndex = selectedIndex === lastIndex
      if (isLastNumIndex) {
        let nextIndex = selectedIndex - 1
        while (!isPossible) {
          const result = binarySearch(sortedDeletedStack, nextIndex)
          if (result < 0) {
            selectedIndex = nextIndex
            isPossible = true
          } else {
            nextIndex--
          }
        }
        lastIndex = selectedIndex
      } else {
        let nextIndex = selectedIndex + 1
        while (!isPossible) {
          const result = binarySearch(sortedDeletedStack, nextIndex)
          if (result < 0) {
            selectedIndex = nextIndex
            isPossible = true
          } else {
            nextIndex++
          }
        }
      }
      //삭제배열에 추가
      totalDeletedStack.push(selectedIndex)
      sortedDeletedStack.push(selectedIndex)
      sortedDeletedStack.sort((a, b) => a - b)
    } else {
      //Z
      const recover = totalDeletedStack.pop()
      arr[recover] = 'O'
      //힙에서 제거
      sortedDeletedStack = [...totalDeletedStack].sort((a, b) => a - b)
      const i = binarySearch(sortedDeletedStack, recover)
      sortedDeletedStack = [
        ...sortedDeletedStack.slice(0, i),
        ...sortedDeletedStack.slice(i + 1, sortedDeletedStack.length),
      ]
    }
    console.log(command, arr.join(''))
  } //for
  answer = arr.join('')
  return answer
} //solution
console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']))
