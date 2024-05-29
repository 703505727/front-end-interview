/**
 * 通用函数柯里
 * 关键：可以存储参数，当参数的数量达到时，返回具体值，否则继续返回一个函数接收剩余的参数
 *
 * 接受一个函数参数，根据后续入参返回函数或者具体值
 */

const curry = (targetFn) => {
  const targetFnArgsLength = targetFn.length;
  return function curried(...args) {
    if (args.length >= targetFnArgsLength) {
      return targetFn.apply(this, args);
    } else {
      return function (...newArgs) {
        return curried.apply(this, [...args, ...newArgs]);
      };
    }
  };
};

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3)); // 输出 6
console.log(curriedSum(1)(2, 3)); // 输出 6
console.log(curriedSum(1)(2)(3)); // 输出 6

const sum2 = (...args) => {
  const fn = (...newArgs) => {
    return sum2(...newArgs, ...args);
  };
  fn.sumOf = () => args.reduce((p, c) => p + c, 0);
  return fn;
};

console.log(sum2(1, 2).sumOf()); // 返回 3
console.log(sum2(1, 2)(3).sumOf()); // 返回 6
console.log(sum2(1)(2, 3, 4).sumOf()); // 返回 10
console.log(sum2(1, 2)(3, 4)(5).sumOf()); // 返回 15
