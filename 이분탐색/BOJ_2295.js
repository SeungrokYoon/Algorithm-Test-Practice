const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = input.shift() * 1
const arr = input.map(Number).sort((a, b) => a - b)

const solution = () => {
  const combi = new Set()
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      if (!combi.has(arr[i] + arr[j])) {
        combi.add(arr[i] + arr[j])
      }
    }
  }

  const combiList = [...combi].sort((a, b) => a - b)
  for (let last = N - 1; last >= 0; last--) {
    for (let third = 0; third < last; third++) {
      const diff = arr[last] - arr[third]
      let left = 0
      let right = combiList.length - 1
      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (combiList[mid] === diff) {
          return arr[last]
        }
        if (combiList[mid] < diff) {
          left = mid + 1
          continue
        }
        right = mid - 1
      }
    }
  }
}
console.log(solution())
