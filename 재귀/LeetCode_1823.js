/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  let answer = 0
  let popped = 0
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i + 1)
  }
  const findWinner = (n, k, arr) => {
    if (arr.length === 1) {
      answer = arr[0]
      return
    }
    popped = (popped + k - 1) % arr.length
    arr = [...arr.slice(0, popped), ...arr.slice(popped + 1, arr.length)]
    findWinner(n - 1, k, arr)
  }
  findWinner(n, k, arr)
  return answer
}
