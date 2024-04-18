// 正常使用
const obj1 = {
  data: "这是我 obj1 的数据",
  fn: function (a, b, c) {
    return this.data + a + b + c;
  },
};
const obj2 = {
  data: "这是我 obj2 的数据",
  fn: function (a, b, c) {
    return this.data + a + b + c;
  },
};

console.log("正常展示：", obj1.fn(1, 2, 3));
console.log("正常展示：", obj2.fn(1, 2, 3));

console.log("使用call展示：", obj1.fn.call(obj2, 1, 2, 3));

// call 是函数上的一个方法，接受多个参数，可以改变该函数的上下文
Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  const r = context.fn(...args);
  delete context.fn;
  return r;
};

console.log("使用myCall展示：", obj1.fn.myCall(obj2, 1, 2, 3));
