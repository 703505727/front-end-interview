// 128. 最长连续序列
// 超时
function longestConsecutive(nums) {
  const set_nums = [...new Set(nums)];
  let ans = -Infinity;
  for (let i = 0; i < set_nums.length; i++) {
    // includes o(n)
    if (!set_nums.includes(set_nums[i] - 1)) {
      const currentValue = set_nums[i];
      let length = 1;
      // includes o(n)
      while (nums.includes(currentValue + 1)) {
        currentValue++;
        length++;
      }
      ans = Math.min(ans, length);
    }
  }
  return ans;
}
function longestConsecutive2(nums) {
  const set_nums = new Set();
  for (const num of nums) {
    set_nums.add(num);
  }

  let ans = 0;
  for (const num of set_nums) {
    // 所以使用map 变成O(1)
    // 检查是否是起点
    if (!set_nums.has(num - 1)) {
      let currentValue = num;
      let length = 1;
      // 所以使用map 变成O(1)
      while (set_nums.has(currentValue + 1)) {
        currentValue++;
        length++;
      }
      ans = Math.max(ans, length);
    }
  }
  return ans;
}

// 49
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    // key排序相同
    const key = str.split("").sort().toString();
    map.has(key) ? map.get(key).push(str) : map.set(key, [str]);
  }
  // Array.from可以从可迭代对象生成一个数组
  return Array.from(map.values());
}

// 283. 移动零
// 首尾指针，双指针

// 1. 两数之和 无序
// 哈希表 ｜ 暴力 ｜ 排序+双指针

// 11. 盛最多水的容器
// 双指针，如果是短的板不移动而长的板移动的话，那么宽度一定会变小。如果中间的板是长板（短板固定不变）水变少，如果中间的板是短板（短板固定不变）水变少。
// 所以不能长板动，长板固定，短板动。

// 438. 找到字符串中所有字母异位词
// 超时
// 这里虽然用的是定长滑动窗口，但是其实还是没有把每次移动窗口要缓存不计算的那一部分缓存下来
function findAnagrams(s, p) {
  const pLength = p.length;
  const pKey = p.split("").sort().toString();
  const ans = [];
  for (let i = 0; i < s.length - pLength + 1; i++) {
    const key = s
      .slice(i, i + pLength)
      .split("")
      .sort()
      .toString();
    if (pKey === key) {
      ans.push(i);
    }
  }
  return ans;
}

// 使用数组记录字母出现的次数
// 定长滑动窗口直接初始化
function findAnagrams(s, p) {
  const pLength = p.length;
  const sLength = s.length;
  if (sLength < pLength) {
    return [];
  }

  const pCountArr = Array(26).fill(0);
  const ck = Array(26).fill(0);

  const ans = [];

  // 直接初始化
  for (let i = 0; i < pLength; i++) {
    pCountArr[p[i].charCodeAt() - "a".charCodeAt()]++;
    ck[s[i].charCodeAt() - "a".charCodeAt()]++;
  }
  // 判断两个字符串含的字母一样
  if (pCountArr.toString() === ck.toString()) {
    ans.push(0);
  }

  for (let i = 1; i < s.length - pLength + 1; i++) {
    ck[s[i - 1].charCodeAt() - "a".charCodeAt()]--;
    ck[s[i + pLength - 1].charCodeAt() - "a".charCodeAt()]++;

    if (pCountArr.toString() === ck.toString()) {
      ans.push(i);
    }
  }
  return ans;
}

// 239. 滑动窗口最大值
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 定长窗口模糊 单调队列题
// 单调递减队列 保存下标
var maxSlidingWindow = function (nums, k) {
  const q = [];
  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    // 入
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);

    // 出
    if (i - q[0] + 1 > k) {
      q.shift();
    }

    // 拿答案
    if (i >= k - 1) {
      ans.push(nums[q[0]]);
    }
  }
  return ans;
};

// 560 和为 K 的子数组
// 子串问题，直接看下标能否小于0（就是数组里的数字是否能为负数，这样价值就会出现负数，至少就不能使用线性DP了，也不能使用滑动窗口了），就能直接确认能否使用DP了，
var subarraySum = function (nums, k) {
  // 前缀和
  // 前缀和能快速计算出一段连续子数组的和
  // 其实就是找[j...i]的和为k，也就是pre[i] - pre[j-1] = k，也就是找在i前面，有没有个j符合条件：p[j] = pre[i] - k, 如果有那就答案加一。
  // 一定要在i前面找j，所以便利一次，也不需要真实的前缀和的数字，找个pre暂时记录即可
  let pre = 0;
  const map = new Map();
  let ans = 0;
  map.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    pre += nums[i];
    if (map.has(pre - k)) {
      ans += map.get(pre - k);
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1);
    } else {
      map.set(pre, 1);
    }
  }
  return ans;
};

// ASCII一共128位，用codePointAt可以拿到其中每个字符的位数，用codeCharAt可以拿到英文的位数
// 记录窗口里的字符个数，可以用两个变量，一个记录它的每一个个数，另一个记录他的种类，不然的话每次找是否满足都要循环。
var minWindow = function (s, t) {
  const sCount = Array(128).fill(0);
  const tCount = Array(128).fill(0);
  let less = 0;
  let ans = "";
  let ansCount = Infinity;
  for (let i = 0; i < t.length; i++) {
    const v = t[i].codePointAt(0);
    if (tCount[v] === 0) {
      less += 1;
    }
    tCount[v] += 1;
  }
  let leftIndex = 0;
  for (let rightIndex = 0; rightIndex < s.length; rightIndex++) {
    // ru
    const right = s[rightIndex].codePointAt(0);
    sCount[right] += 1;
    if (sCount[right] === tCount[right]) {
      less--;
    }
    // chu
    while (less === 0) {
      // 满足条件
      const ansTemp = s.slice(leftIndex, rightIndex + 1);
      if (ansTemp.length < ansCount) {
        ans = ansTemp;
        ansCount = ans.length;
      }
      const left = s[leftIndex].codePointAt(0);
      if (sCount[left] === tCount[left]) {
        less++;
      }
      sCount[left]--;
      leftIndex++;
    }
  }
  return ans;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 56合并区间 区间第一位升序，分类讨论第二位
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const ans = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= ans[ans.length - 1][1]) {
      if (intervals[i][1] > ans[ans.length - 1][1]) {
        ans[ans.length - 1][1] = intervals[i][1];
      } else {
        continue;
      }
    } else {
      ans.push(intervals[i]);
    }
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 189. 轮转数组
// 额外数组
var rotate = function (nums, k) {
  const temp = [...nums];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = temp[(i + temp.length - (k % temp.length)) % temp.length];
  }
};

// 反转数组
var rotate = function (nums, k) {
  const n = nums.length;
  k = k % n;
  const r = (i, j) => {
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  };
  r(0, n - 1);
  r(0, k - 1);
  r(k, n - 1);
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 238. 除自身以外数组的乘积
// 不能用除法 -> 怕数组中出现0
// 左右乘积法
var productExceptSelf = function (nums) {
  const n = nums.length;
  const l = Array(n).fill(1);
  const r = Array(n).fill(1);

  let pre = 1;
  for (let i = 1; i < n; i++) {
    l[i] = nums[i - 1] * pre;
    pre = l[i];
  }
  let post = 1;
  for (let i = n - 2; i >= 0; i--) {
    r[i] = nums[i + 1] * post;
    post = r[i];
  }
  const ans = Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    ans[i] = r[i] * l[i];
  }
  return ans;
};

// 上下三角法 O(1)空间复杂度
// https://leetcode.cn/problems/product-of-array-except-self/solutions/11472/product-of-array-except-self-shang-san-jiao-xia-sa/?envType=study-plan-v2&envId=top-100-liked
var productExceptSelf = function (nums) {
  const n = nums.length;

  const ans = Array(n).fill(1);

  let pre = 1;
  for (let i = 1; i < n; i++) {
    ans[i] = nums[i - 1] * pre;
    pre = nums[i - 1] * pre;
  }
  pre = 1;
  for (let i = n - 2; i >= 0; i--) {
    ans[i] = ans[i] * nums[i + 1] * pre;
    pre = nums[i + 1] * pre;
  }
  return ans;
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 48 旋转图像
// 多种方式旋转，我这是使用辅助数组
var rotate = function (matrix) {
  const n = matrix.length;
  const temp = Array(n);
  for (let i = 0; i < n; i++) {
    temp[i] = [...matrix[i]];
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = temp[n - j - 1][i];
    }
  }
  // 共3步 (2,0) <- (0,1) | (3,0) <- (0,0) | (3,2) <- (2,0) | (2,1) <- (1,1)
};

// 原地修改，旋转其实就是转圈赋值，一个辅助变量记录初始位置的值，逆向取值，循环1/4个地方
var rotate = function (matrix) {
  const n = matrix.length;
  let temp = undefined;
  // 一个是floor 一个是ceil 不能多转
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.ceil(n / 2); j++) {
      // 记录初始位置的变量
      temp = matrix[i][j];
      // 旋转赋值
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 240. 搜索二维矩阵 II
// 解法2 - 从右上角开始，小往左，大往下
var searchMatrix = function (matrix, target) {
  const binaryFind = (arr, target) => {
    let left = 0;
    let rigth = arr.length - 1;
    while (left <= rigth) {
      let mid = Math.floor(left + (rigth - left) / 2);
      if (arr[mid] === target) {
        return true;
      } else if (arr[mid] > target) {
        rigth = mid - 1;
      } else if (arr[mid] < target) {
        left = mid + 1;
      }
    }
    return false;
  };
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] <= target && matrix[i][matrix[i].length - 1] >= target) {
      if (binaryFind(matrix[i], target)) {
        return true;
      }
    }
  }
  return false;
};
/**
 * 快慢指针
 * 快走两步、慢走一步
 * 快慢指针都指向头节点
 * 如果链表长度为奇数，那么慢指针一定在中间的节点（快指针指向最后一个节点时）
 * 如果链表长度为偶数，那么慢指针一定在中间的节点(第二个)（快指针指向空）
 */
// 给你单链表的头结点 head ，请你找出并返回链表的中间结点。
// 如果有两个中间结点，则返回第二个中间结点。
// 876 链表的中
var middleNode = function (head) {
  let f = head;
  let s = head;
  while (f && f.next) {
    f = f.next.next;
    s = s.next;
  }
  return s;
};

// 141 环形链表
var middleNode = function (head) {
  let f = head;
  let s = head;
  while (f && f.next) {
    f = f.next.next;
    s = s.next;
    //  多加了这一部分代码
    if (s === f) {
      return true;
    }
  }
  return false;
};

// 142. 环形链表 II
// 相遇后，head继续走会跟slow相遇，相遇点为环形入口
var detectCycle = function (head) {
  let f = head;
  let s = head;
  while (f && f.next) {
    f = f.next.next;
    s = s.next;
    //  多加了这一部分代码
    if (s === f) {
      //  多加了这一部分代码
      while (s !== head) {
        s = s.next;
        head = head.next;
      }
      return s;
    }
  }
  return null;
};

// 143. 重排链表
// 找到中点，反转，交错穿插
var reorderList = function (head) {
  const findMiddleNode = function (head) {
    let f = head;
    let s = head;
    while (f && f.next) {
      f = f.next.next;
      s = s.next;
    }
    return s;
  };
  const re = function (head) {
    let pre = null;
    let cur = head;
    while (cur) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    return pre;
  };
  let head2 = re(findMiddleNode(head));
  // 记住这个
  while (head2.next) {
    const headnext = head.next;
    const head2next = head2.next;
    head.next = head2;
    head2.next = headnext;
    head = headnext;
    head2 = head2next;
  }
};

// 234. 回文链表
// 第一种方法就是把数放到数组，然后通过双指针判断
// 第二种方法使用快慢指针，先反转链表，在对比
var isPalindrome = function (head) {
  const findMiddleNode = function (head) {
    let f = head;
    let s = head;
    while (f && f.next) {
      f = f.next.next;
      s = s.next;
    }
    return s;
  };
  const re = function (head) {
    let pre = null;
    let cur = head;
    while (cur) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    return pre;
  };
  let head2 = re(findMiddleNode(head));
  while (head2 && head) {
    if (head2.val !== head.val) {
      return false;
    }
    head2 = head2.next;
    head = head.next;
  }
  return true;
};

// 岛屿问题
// 695. 岛屿的最大面积
var maxAreaOfIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const isValid = (x, y) => {
    return x >= 0 && x <= n - 1 && y >= 0 && y <= m - 1;
  };
  const getArea = (x, y, grid) => {
    if (!isValid(x, y)) {
      return 0;
    }
    if (grid[x][y] !== 1) {
      return 0;
    }

    grid[x][y] = 2;

    return (
      1 +
      getArea(x - 1, y, grid) +
      getArea(x + 1, y, grid) +
      getArea(x, y - 1, grid) +
      getArea(x, y + 1, grid)
    );
  };

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(res, getArea(i, j, grid));
      }
    }
  }
  return res;
};

// 200. 岛屿数量
var numIslands = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const isValid = (x, y) => {
    return x >= 0 && x <= n - 1 && y >= 0 && y <= m - 1;
  };
  // 跟面积一样的思路，只是dfs时将岛屿填平为0
  const getArea = (x, y, grid) => {
    if (!isValid(x, y)) {
      return;
    }
    if (grid[x][y] !== "1") {
      return;
    }

    grid[x][y] = "0";

    return (
      getArea(x - 1, y, grid) +
      getArea(x + 1, y, grid) +
      getArea(x, y - 1, grid) +
      getArea(x, y + 1, grid)
    );
  };

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        res += 1;
        getArea(i, j, grid);
      }
    }
  }
  return res;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 21. 合并两个有序链表
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0, null);
  let index1 = list1;
  let index2 = list2;
  let pre = dummy;
  while (index1 && index2) {
    if (index1.val > index2.val) {
      pre.next = index2;
      index2 = index2.next;
      pre = pre.next;
    } else {
      pre.next = index1;
      index1 = index1.next;
      pre = pre.next;
    }
  }
  if (index1) {
    pre.next = index1;
  } else {
    pre.next = index2;
  }
  return dummy.next;
};

// 最小栈，用辅助栈记录，当前操作元素所对应元素前面的最小元素
var MinStack = function () {
  this.stack = [];
  this.stack2 = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  if (this.stack.length) {
    this.stack.push(val);
    const min = Math.min(val, this.stack2[this.stack2.length - 1]);
    this.stack2.push(min);
  } else {
    this.stack.push(val);
    this.stack2.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.stack2.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.stack2[this.stack2.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/**
 * @param {string} s
 * @return {string}
 */
// 394. 字符串解码
// 考虑多位数字的情况
var decodeString = function (s) {
  const getStr = (str) => {
    let target = "";
    let i = 0;
    while (i < str.length) {
      if (Number(str[i])) {
        let curCount = Number(str[i]);
        while (Number(str[i + 1]) || Number(str[i + 1]) === 0) {
          i++;
          curCount = curCount * 10 + Number(str[i]);
        }
        let count = 1;
        let j = i + 2;
        while (count > 0) {
          if (str[j] === "]") {
            count--;
          } else if (str[j] === "[") {
            count++;
          }
          j++;
        }
        // const newStr = str.substring(i + 2, j - 1);
        const newStr = str.slice(i + 2, j - 1);
        target += getStr(newStr).repeat(curCount);
        i = j;
      } else {
        target += str[i];
        i++;
      }
    }
    return target;
  };
  return getStr(s);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 98. 验证二叉搜索树
// 错误的只检查了节点与其直接的子节点之间的关系，没有检查整棵子树。对于二叉搜索树来说，我们需要验证对于任何节点都要满足要求
var isValidBST = function (root) {
  // 错误答案
  const dfs = (node) => {
    if (!node) {
      return true;
    }
    return (
      (node.left ? node.left.val < node.val && dfs(node.left) : true) &&
      (node.right ? node.right.val > node.val && dfs(node.right) : true)
    );
  };
  return dfs(root);
};

// 前序遍历
var isValidBST = function (root) {
  const preDfs = (node, low, high) => {
    if (!node) {
      return true;
    }
    if (node.val <= low || node.val >= high) {
      return false;
    }
    return (
      preDfs(node.left, low, node.val) && preDfs(node.right, node.val, high)
    );
  };
  return preDfs(root, -Infinity, Infinity);
};

// 中序 严格递增
var isValidBST = function (root) {
  let pre = -Infinity;
  const minDfs = (node) => {
    if (!node) {
      return true;
    }
    if (!minDfs(node.left)) {
      return false;
    }
    if (node.val <= pre) {
      return false;
    }
    pre = node.val;
    return minDfs(node.right);
  };
  return minDfs(root);
};

// 148. 排序链表
function sortList(head) {
  const dummy = new ListNode(0, null);
  let pre = dummy;
  const nodeArray = [];
  while (head) {
    // 要将原来的next断开，不然链表节点之间的关系没有正确断开，导致最终的链表可能形成了一个环
    const headNext = head.next;
    head.next = null;
    nodeArray.push(head);
    head = headNext;
  }
  nodeArray.sort((a, b) => a.val - b.val);

  for (let i = 0; i < nodeArray.length; i++) {
    pre.next = nodeArray[i];
    pre = pre.next;
  }

  return dummy.next;
}

// 并归排序 写法
// 自顶向下‘分’，自下而上‘治’
const merge = (head1, head2) => {
  const dummy = new ListNode(0, null);
  let pre = dummy;
  while (head1 && head2) {
    if (head1.val > head2.val) {
      pre.next = head2;
      head2 = head2.next;
    } else {
      pre.next = head1;
      head1 = head1.next;
    }
    pre = pre.next;
  }
  if (head1) {
    pre.next = head1;
  }
  if (head2) {
    pre.next = head2;
  }
  return dummy.next;
};

// 分
const toSortList = (head, tail) => {
  if (!head) {
    return head;
  }
  if (head.next === tail) {
    // 分的核心代码，最后变成一个元素（此处仅在链表时核心，因为要断开）
    head.next = null;
    return head;
  }
  let fast = head;
  let slow = head;
  while (fast !== tail) {
    slow = slow.next;
    fast = fast.next;
    if (fast !== tail) {
      fast = fast.next;
    }
  }
  const mid = slow;
  return merge(toSortList(head, mid), toSortList(mid, tail));
};

var sortList = function (head) {
  return toSortList(head, null);
};

// 45. 跳跃游戏 II
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  // dfs(i) = dfs(j) + 1
  const length = nums.length;
  const dp = Array(length).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i < length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] + j >= i) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[length - 1];
};

// 763. 划分字母区间
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.get(s[i]) ? map.set(s[i], map.get(s[i]) + 1) : map.set(s[i], 1);
  }
  const target = [];
  const set = new Set([]);
  for (let i = 0; i < s.length; i++) {
    set.add(s[i]);
    map.set(s[i], map.get(s[i]) - 1);
    if (map.get(s[i]) === 0) {
      set.delete(s[i]);
      if (set.size === 0) {
        if (target.length === 0) {
          target.push(i + 1);
        } else {
          target.push(i + 1 - target.reduce((a, b) => a + b, 0));
        }
      }
    }
  }
  return target;
};

// 118. 杨辉三角
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let count = numRows - 1;
  const target = [[1]];
  while (count) {
    const temp = [1];
    for (let i = 0; i < target[target.length - 1].length - 1; i++) {
      temp.push(
        target[target.length - 1][i] + target[target.length - 1][i + 1]
      );
    }
    temp.push(1);
    target.push(temp);
    count--;
  }
  return target;
};

// 279. 完全平方数
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= Math.floor(Math.sqrt(i)); j++) {
      if (i >= j * j) {
        dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
      }
    }
  }
  return dp[n];
};

// 139. 单词拆分
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  // dfs(i) = j  s.slice(i+1-j.length,i+1)===j dfs(i-j.length) false
  const length = s.length;
  const dp = Array(length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= length; i++) {
    for (let j = 0; j < wordDict.length; j++) {
      if (
        i >= wordDict[j].length &&
        s.slice(i - wordDict[j].length, i) === wordDict[j]
      ) {
        dp[i] = dp[i - wordDict[j].length] || dp[i];
      }
    }
  }
  return dp[length];
};

// 152. 乘积最大子数组
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // dfs(i) = zheng nums(i) max(dfs(i-1) * nums(i),nums(i))
  const length = nums.length;
  const dp = Array(length)
    .fill(0)
    .map(() => [0, 0]);

  dp[0][0] = nums[0];
  dp[0][1] = nums[0];
  let target = -Infinity;
  for (let i = 1; i < length; i++) {
    if (nums[i] >= 0) {
      dp[i][0] = Math.min(nums[i], nums[i] * dp[i - 1][0]);
      dp[i][1] = Math.max(nums[i], nums[i] * dp[i - 1][1]);
    } else {
      dp[i][0] = Math.min(nums[i], nums[i] * dp[i - 1][1]);
      dp[i][1] = Math.max(nums[i], nums[i] * dp[i - 1][0]);
    }
    target = Math.max(target, dp[i][1]);
  }
  return target;
};

// 64. 最小路径和
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  // dfs(i,j) = min dfs(i-1,j) dfs(i,j-1)
  // dfs(i) = dfs(i-1) + dfs(i)
  const n = grid.length;
  const m = grid[0].length;
  const dp = Array(m).fill(0);

  // const dp = Array(n)
  //   .fill(0)
  //   .map(() => Array(m).fill(Infinity));
  dp[0] = grid[0][0];
  for (let i = 1; i < n; i++) {
    dp[i] = dp[i - 1] + grid[0][i];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i] = Math.min(dp[i], dp[i - 1]) + grid[i][j];
    }
  }
  return dp[n - 1];
};

// 39 组合合成
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // 选或者不选
  // dfs(i, t) dfs(i,t-candidates[i]) dfs(i+1,t)
  const path = [];
  const ans = [];
  const dfs = (i, t) => {
    if (t === 0) {
      ans.push(path.slice());
      return;
    }
    if (i === candidates.length) {
      return;
    }
    dfs(i + 1, t);

    path.push(candidates[i]);
    dfs(i, t - candidates[i]);
    path.pop();
  };
  dfs(0, target);
  return ans;
};

// k 个头指针解法
// 两两合并
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const dummy = new ListNode(0, null)
  let pre = dummy
  const length = lists.length
  let isNull = 0;
  while (isNull < length) {
    let min = 0;
    for (let i = 1; i < length; i++) {
      if ((lists[i] ? lists[i].val : Infinity) < (lists[min] ? lists[min].val : Infinity)) {
        min = i
      }
    }
    if (!lists[min]) {
      break
    }
    pre.next = lists[min];
    pre = pre.next
    lists[min] = lists[min].next
    if (!lists[min]) {
      isNull++
    }
  }
  return dummy.next
};


/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  let cur = head;
  const map = new Map();
  // 新旧节点对应map，但是next random 仍指向旧节点
  while (cur) {
    map.set(cur, new _Node(cur.val, cur.next, cur.random))
    cur = cur.next
  }
  cur = head;
  // 更新next random
  while (cur) {
    const node = map.get(cur)
    if (node) {
      node.next = node.next ? map.get(node.next) : null
      node.random = node.random ? map.get(node.random) : null
    }
    cur = cur.next
  }
  return map.get(head)
};

// 上方法仍需要 On 的空间复杂度
var copyRandomList2 = function (head) {
  if (!head) {
    return null
  }
  let cur = head;
  // 每个链表复制一个新的在后面跟着
  while (cur) {
    const newNode = new _Node(cur.val)
    newNode.next = cur.next
    cur.next = newNode
    cur = newNode.next
  }
  cur = head;
  // 更新复制了的node的random
  while (cur) {
    if (cur.random) {
      cur.next.random = cur.random.next
    }
    cur = cur.next.next
  }
  // 拆分
  cur = head.next;
  const res = head.next;
  let pre = head

  while (cur.next) {
    pre.next = pre.next.next
    cur.next = cur.next.next
    pre = pre.next
    cur = cur.next
  }
  pre.next = null
  return res
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  // dfs(i,j) = [i-dfs(i-1,j-1),  i] [j-dfs(i-1,j-1),j]
  const n = matrix.length;
  const m = matrix[0].length;
  const dp = Array(n).fill(0).map(() => Array(m).fill(0))
  for (let i = 0; i < n; i++) {
    if (matrix[i][0] === '1') {
      dp[i][0] = 1
    }
  }
  for (let j = 0; j < m; j++) {
    if (matrix[0][j] === '1') {
      dp[0][j] = 1
    }
  }
  let ans = 0;
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      for (let k = 0; k <= dp[i][j]; k++) {
        if (i - k >= 0 && j - k >= 0 && matrix[i - k][j - k] === '1') {
          dp[i][j] += 1
        } else {
          break
        }
        ans = Math.max(ans, dp[i][j])
      }
    }
  }
  return ans * ans
};