// 新建数组排序
const quickSort1 = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const q = arr.splice(0, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= q) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort1(left).concat([q], quickSort1(right));
};

console.log(quickSort1([3, 6, 2, 4, 1, 8, 9, 7, 5]));

// 原地排序
const partition = (arr, left, right) => {
  const pivotValue = arr[right];
  let pivotIndex = left - 1;
  for (let i = left; i < right; i++) {
    if (arr[i] <= pivotValue) {
      pivotIndex++;
      [arr[pivotIndex], arr[i]] = [arr[i], arr[pivotIndex]];
    }
  }
  [arr[pivotIndex + 1], arr[right]] = [arr[right], arr[pivotIndex + 1]];
  return pivotIndex + 1;
};
const quickSort2 = (arr, left, right) => {
  if (left < right) {
    const q = partition(arr, left, right);
    quickSort2(arr, left, q - 1);
    quickSort2(arr, q + 1, right);
  }
  return arr;
};
console.log(quickSort2([3, 6, 2, 4, 1, 8, 9, 7, 5], 0, 8));
