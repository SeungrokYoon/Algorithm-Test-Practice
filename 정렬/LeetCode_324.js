/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
  nums.sort((a, b) => a - b)
  const smallLength = nums.length % 2 === 0 ? nums.length / 2 : Math.ceil(nums.length / 2)
  const smallerArray = nums.slice(0, smallLength)
  const biggerArray = nums.slice(smallLength)
  let j = 0
  for (let i = 0; i < Math.floor(nums.length / 2); i++) {
    nums[j++] = smallerArray[smallLength - 1 - i]
    nums[j++] = biggerArray[biggerArray.length - 1 - i]
  }
  if (nums.length % 2 !== 0) nums[j] = smallerArray[0]
}
