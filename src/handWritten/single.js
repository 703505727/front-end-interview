class Single {
  static instance;
  static getInstance() {
    if (Single.instance) {
      return Single.instance;
    }
    Single.instance = new Single();
    return Single.instance;
  }
  constructor() {
    if (Single.instance) {
      return Single.instance;
    }
    Single.instance = this;
    return Single.instance;
  }
  sayHi() {
    console.log("i am single");
  }
}

const single2 = (function () {
  let instance = null;
  function ins() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.sayHi = function () {
      console.log("i am single");
    };
  }
  return ins;
})();

var instance1 = new single2();
var instance2 = new single2();

console.log(instance1 === instance2); // 输出: true

var instance3 = new Single();
var instance4 = new Single();

console.log(instance3 === instance4); // 输出: true
