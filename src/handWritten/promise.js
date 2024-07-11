/**
 * promise
 * 含义：接受一个函数的类，该入参函数接收两个函数入参。
 */

class MyPromise {
  constructor(fn) {
    this.state = "pending";
    this.value = undefined;
    this.error = undefined;
    this.onResolveCallback = [];
    this.onRejectCallback = [];

    const resolve = (v) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = v;
        this.onResolveCallback.forEach((fn) => fn());
      }
    };

    const rejected = (e) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.error = e;
        this.onRejectCallback.forEach((fn) => fn());
      }
    };

    try {
      fn(resolve, rejected);
    } catch (e) {
      rejected(e);
    }
  }
  then(onResolve, onReject) {
    onResolve =
      typeof onResolve === "function" ? onResolve : (onResolve) => onResolve;
    onReject =
      typeof onReject === "function"
        ? onReject
        : (onReject) => {
            throw onReject;
          };

    return new MyPromise((res, rej) => {
      if (this.state === "fulfilled") {
        queueMicrotask(() => {
          try {
            const v = onResolve(this.value);
            res(v);
          } catch (e) {
            rej(e);
          }
        });
      }
      if (this.state === "rejected") {
        queueMicrotask(() => {
          try {
            const v = onReject(this.error);
            res(v);
          } catch (e) {
            rej(e);
          }
        });
      }

      if (this.state === "pending") {
        this.onResolveCallback.push(() => {
          queueMicrotask(() => {
            try {
              const v = onResolve(this.value);
              res(v);
            } catch (e) {
              rej(e);
            }
          });
        });

        this.onRejectCallback.push(() => {
          queueMicrotask(() => {
            try {
              const v = onReject(this.error);
              res(v);
            } catch (e) {
              rej(e);
            }
          });
        });
      }
    });
  }
  catch(onReject) {
    return this.then(null, onReject);
  }

  // promise.resolve promise.reject
  static resolve(v) {
    return new MyPromise((res, rej) => {
      res(v);
    });
  }
  static reject(e) {
    return new MyPromise((res, rej) => {
      rej(e);
    });
  }
}

// all
MyPromise.prototype.myAll = function (array) {
  return new MyPromise((res, rej) => {
    const length = array.length;
    let count = 0;
    const target = Array(length).fill(undefined);
    for (let i = 0; i < length; i++) {
      array[i].then(
        (resValue) => {
          target[i] = resValue;
          count++;
          if (count === length) {
            res(target);
          }
        },
        (e) => {
          rej(e);
        }
      );
    }
  });
};

MyPromise.prototype.myRace = function (array) {
  return new MyPromise((res, rej) => {
    for (let i = 0; i < array.length; i++) {
      array[i].then(res, rej);
    }
  });
};

class U {
  constructor() {
    this.promise = Promise.resolve();
  }

  console(val) {
    this.promise = this.promise.then(() => {
      console.log(val);
    });
    return this;
  }

  setTimeout(wait) {
    this.promise = this.promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, wait);
      });
    });
    return this;
  }
}
const u = new U();
u.console("breakfast")
  .setTimeout(3000)
  .console("lunch")
  .setTimeout(3000)
  .console("dinner");
