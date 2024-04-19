/**
 * 防抖
 * 含义：防止用户抖动
 * 关键：用户最后一次触发方有效
 *
 * 接受两个参数：函数，防抖秒数
 * 返回一个函数
 */

const myDebounce = (fn, wait) => {
  let timeId = null;
  return function (...args) {
    const context = this;
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn.call(context, ...args);
    }, wait);
  };
};
