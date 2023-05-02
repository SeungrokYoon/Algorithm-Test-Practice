const mergeSort = (arr, left, right) => {
  const mid = Math.floor((left + right) / 2)
  //base condition
  if (left === right) {
    return [arr[left]]
  }
  //좌, 우 파트로 분리하여 mergeSort
  const leftPart = mergeSort(arr, left, mid)
  const rightPart = mergeSort(arr, mid + 1, right)

  //각 파트를 비교하며 분배
  let i = 0
  let j = 0
  const totalArr = []
  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] < rightPart[j]) {
      totalArr.push(leftPart[i])
      i++
    } else {
      totalArr.push(rightPart[j])
      j++
    }
  }
  while (i < leftPart.length) {
    totalArr.push(leftPart[i++])
  }
  while (j < rightPart.length) {
    totalArr.push(rightPart[j++])
  }

  return totalArr
}

const arr = [40, 20, 50, 10, 30, 70, 60, 80, 100, 90]

console.log(mergeSort(arr, 0, arr.length - 1))
