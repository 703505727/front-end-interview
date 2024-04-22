// 数组平铺
const flatten = (array) => {
  let target = [];
  for (let i of array) {
    if (Array.isArray(i)) {
      target = target.concat(flatten(i));
    } else {
      target.push(i);
    }
  }
  return target;
};

console.log(flatten([1, [1, 2, [2, 4]], 3, 5])); // [1, 1, 2, 2, 4, 3, 5]
