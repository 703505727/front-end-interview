const myCompose = (fns) => {
  return function (result) {
    let newFnList = fns.slice();
    while (newFnList.length > 0) {
      result = newFnList.pop()(result);
    }
    return result;
  };
};

const add = (x) => x + 1;
const multiply = (x) => x * 2;
const minus = (x) => x - 1;

console.log(myCompose([minus, multiply, add])(1)); // 3
