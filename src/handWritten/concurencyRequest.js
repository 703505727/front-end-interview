const taskRun = async (i, t) => {
  const a = await new Promise((res) => {
    setTimeout(() => {
      res(`${i}**${t}`);
    }, t);
  });
  return a;
};

const concurencyRequest = (taskList, maxNum) => {
  return new Promise((res) => {
    if (taskList.length === 0) {
      res([]);
      return;
    }
    const results = Array(taskList.length).fill(undefined);
    let index = 0;
    let finishCount = 0;

    const runItem = async () => {
      if (index >= taskList.length) {
        return;
      }
      const currentIndex = index;
      index++;
      try {
        const r = await taskRun(currentIndex, taskList[currentIndex]);
        results[currentIndex] = r;
      } catch (e) {
        results[currentIndex] = e;
      } finally {
        finishCount++;
        if (finishCount === taskList.length) {
          console.log(results);
          res(results);
          return;
        }
        runItem();
      }
    };

    const realMaxNum = Math.min(taskList.length, maxNum);
    for (let i = 0; i < realMaxNum; i++) {
      runItem();
    }
  });
};

const getTaskList = () => {
  const taskList = [];
  for (let i = 0; i < 100; i++) {
    taskList.push(Math.random() * 1000);
  }
  return taskList;
};
// concurencyRequest(getTaskList(), 5);

// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出

class Scheduler {
  constructor() {
    this.count = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((res) => {
      this.queue.push({ res, task });
      this.run();
    });
  }
  run() {
    if (this.queue.length && this.count < 2) {
      this.count++;
      const { res, task } = this.queue.shift();
      task().then(() => {
        res();
        this.count--;
        this.run();
      });
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
