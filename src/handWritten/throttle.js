/**
 * 节流
 * 含义：多次触发，在同一段时间内只生效一次
 * 关键：立即执行 且 之后一段时间触发都没有用
 *
 * 接受两个参数：函数，防抖秒数
 * 返回一个函数
 */

const myThrottle = (fn, wait) => {
  let timeId = null;
  return function (...args) {
    const context = this;
    if (timeId) {
      return;
    }
    fn.call(context, ...args);
    timeId = setTimeout(() => {
      timeId = null;
    }, wait);
  };
};
