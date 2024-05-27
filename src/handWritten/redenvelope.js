class RedEnvelope {
  remainAmount;
  remainCount;
  constructor(amount, count) {
    if (amount * 100 < count) {
      throw new Error("每个红包金额不得小于0.01");
    }
    this.remainAmount = amount * 100;
    this.remainCount = count;
  }
  getOne() {
    if (this.remainCount === 0) {
      console.log("红包抢完了");
      return 0;
    }
    if (this.remainCount === 1) {
      this.remainCount = this.remainCount - 1;
      const ans = this.remainAmount;
      this.remainAmount = 0;
      return (ans / 100).toFixed(2);
    }
    // 剪掉一个红包
    this.remainCount = this.remainCount - 1;
    // 得到剩余可分配的额度，所有额度-剩余每个红包至少一分钱-当前红包至少一分钱
    const canUseAmount = this.remainAmount - this.remainCount - 1;
    // 当前红包额度等于随机金额+1分钱
    const redAounmt = Math.ceil(Math.random() * canUseAmount) + 1;
    this.remainAmount = this.remainAmount - redAounmt;
    return (redAounmt / 100).toFixed(2);
  }
}
