// 在被检查的对象上拿__proto__，递归对比prototype，直到null则是false
const myInstanceOf = (left, right) => {
  let prototype = right.prototype;
  let leftPrototype = left.__proto__;
  while (true) {
    if (!leftPrototype) {
      return false;
    }
    if (leftPrototype === prototype) {
      return true;
    }
    leftPrototype = leftPrototype.__proto__;
  }
};

console.log(myInstanceOf([], Array)); // true
