/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 34
var searchRange = function (nums, target) {
  // 大于等于target的某个数，可以直接用三种方式写出，比较简单思考。
  // 大于某个数x的下标答案，可以等同于大于等于x+1的下标答案
  // 小于某个数x的下标答案，可以等同于大于等于x的下标答案-1
  // 小于等于某个数x的下标答案，可以等同于大于x的下标答案-1，进一步就是可以等同于大于x+1的下标答案-1
  const maxEqual = (nums, target) => {
    let left = -1;
    let right = nums.length;
    //可用区间
    while (left + 1 < right) {
      const mid = Math.floor((left + right) / 2); //每次取用区间
      //已经用过了mid
      if (nums[mid] >= target) {
        right = mid;
      } else {
        left = mid;
      }
    }
    return right;
  };
  const start = maxEqual(nums, target); // 大于等于target
  if (nums[start] !== target) {
    return [-1, -1];
  }
  const end = maxEqual(nums, target); //找到小于等于target的下标，大于等于target+1的下标 -1
  return [start, end];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 162 寻找峰值
var findPeakElement = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] >= nums[mid + 1]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left - 1;
};
