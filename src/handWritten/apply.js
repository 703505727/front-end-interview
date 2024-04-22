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

console.log("使用apply展示", obj1.fn.apply(obj2, [1, 2, 3]));

// apply 是函数上的一个方法，接受两个参数，可以改变该函数的上下文

Function.prototype.myApply = function (context, args) {
  context.fn = this;
  let target;
  if (args) {
    target = context.fn(...args);
  } else {
    target = context.fn();
  }
  delete context.fn;
  return target;
};

console.log("使用apply展示", obj1.fn.myApply(obj2, [1, 2, 3]));
