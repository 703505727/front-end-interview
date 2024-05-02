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
        console.log(r, currentIndex, "r");
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
concurencyRequest(getTaskList(), 5);
