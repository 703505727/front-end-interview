class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    if (this.events[name]) {
      this.events[name].push(fn);
    } else {
      this.events[name] = [fn];
    }
  }
  emit(name, ...args) {
    (this.events[name] ?? []).forEach((fn) => fn.apply(args));
  }
  remove(name, fn) {
    this.events[name] = (this.events[name] ?? []).filter((i) => i !== fn);
  }
  once(name, fn) {
    const newFn = (...arg) => {
      fn(...arg);
      this.remove(name, newFn);
    };
    this.on(name, newFn);
  }
}
