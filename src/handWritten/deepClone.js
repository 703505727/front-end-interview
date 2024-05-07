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

console.log(deepClone({ name: "jack", birth: { year: "1997", month: "10" } })); // {name: 'jack', birth: {…}}
