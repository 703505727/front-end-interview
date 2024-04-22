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

console.log("使用bind展示", obj1.fn.bind(obj2, 1, 2, 3)());

// bind 是函数上的一个方法，接受多个参数，可以改变该函数的上下文

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

console.log("使用bind展示", obj1.fn.myBind(obj2, 1)(2, 3));
