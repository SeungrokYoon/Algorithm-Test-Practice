//Pivot 을 확정시켜가면서 정렬

const partition = (arr, left, right) => {
  const pivot = arr[right]
  let i = left - 1
  for (let j = left; j <= right - 1; j++) {
    if (arr[j] <= pivot) {
      i++
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
  const nextPivotIndex = i + 1
  const temp = arr[nextPivotIndex]
  arr[nextPivotIndex] = pivot
  arr[right] = temp
  return nextPivotIndex
}

const quickSort = (arr, left, right) => {
  if (left < right) {
    const pivot = partition(arr, left, right)
    quickSort(arr, left, pivot - 1)
    quickSort(arr, pivot + 1, right)
  }
}

const arr = [40, 20, 50, 10, 30, 70, 60, 80, 100, 90]
quickSort(arr, 0, arr.length - 1)
console.log(arr)
