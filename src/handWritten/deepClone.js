const deepClone = (obj) => {
  // 如果是栈类型，直接返回
  const ans = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ans[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return ans;
};

console.log(
  1,
  deepClone({ name: "jack", birth: { year: "1997", month: "10" } }),
  deepClone(1)
); // {name: 'jack', birth: {…}}

const deepClone2 = (target) => {
  if (typeof target === "object") {
    const ans = target instanceof Array ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        ans[key] = deepClone(target[key]);
      }
    }
    return ans;
  } else {
    return target;
  }
};

console.log(
  2,
  deepClone2({ name: "jack", birth: { year: "1997", month: "10" } }),
  deepClone2([{ a: 1 }, { b: 2 }])
);
