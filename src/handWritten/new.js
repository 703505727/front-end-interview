// 1、创建了一个空对象。
// 2、这个空对象的__proto__被设置为Person.prototype，意味着它可以访问sayHello方法。
// 3、在Person函数体内，this关键字引用了新创建的对象，并给它添加了name和age属性。
// 4、因为Person内部没有返回其他对象，new操作符将返回这个新创建的对象。
function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

function Animal(name) {
  this.name = name;
}

let animal = myNew(Animal, "dog");
console.log(animal, animal.name);
