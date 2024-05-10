const printer = (s) => {
  s = s - 1;
  if (s >= 0) {
    setTimeout(() => {
      printer(s);
    }, 1000);
  }
};
printer(5);
