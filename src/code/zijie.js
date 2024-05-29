// 链表题，包含有倒数第几个数都可以用快慢指针来做，可能会对头节点进行处理，最好加一个哨兵，从哨兵开始记录
// 一般思考中间节点交换的流程，两头的节点都是固定的，这个时候最好用哨兵
// 但凡可能对头节点进行处理的，都可以加一个哨兵
// 这一题是可能删除掉头节点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 删除倒数第n个节点
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let pre = new ListNode(0, head);
  let fast = pre;
  let slow = pre;
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return pre.next;
};

// 反转链表 两个指针 经典
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    const nextNode = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nextNode;
  }
  return pre;
};

// 可能反转到头节点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const dummy = new ListNode(0, head);
  let p = dummy;
  for (let i = 0; i < left - 1; i++) {
    p = p.next;
  }
  let pre = null;
  let cur = p.next;
  for (let i = 0; i <= right - left; i++) {
    const curNext = cur.next;
    cur.next = pre;
    pre = cur;
    cur = curNext;
  }
  p.next.next = cur;
  p.next = pre;
  return dummy.next;
};

// 1、数总数 2、循环反转对应的部分 3、每次开始的链表节点部分的前一个节点其实就是上一次翻转部分的第一个节点，也就是p.next,所以要保存下来，更新p
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// k个一组翻转链表
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let length = 0;
  let headCount = head;
  while (headCount) {
    length += 1;
    headCount = headCount.next;
  }

  const dummy = new ListNode(0, head);
  let p = dummy;
  let alreadCount = 0;
  while (length - alreadCount >= k) {
    let pre = null;
    let cur = p.next;
    for (let i = 0; i < k; i++) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    p.next.next = cur;
    const nextP = p.next;
    p.next = pre;
    p = nextP;
    alreadCount += k;
  }
  return dummy.next;
};

// 两两交换链表中的节点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let length = 0;
  let headCount = head;
  while (headCount) {
    length++;
    headCount = headCount.next;
  }
  const dummy = new ListNode(0, head);
  let p = dummy;
  let alreadCount = 0;
  while (length - alreadCount >= 2) {
    let pre = null;
    let cur = p.next;
    for (let i = 0; i < 2; i++) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    p.next.next = cur;
    const pNext = p.next;
    p.next = pre;
    p = pNext;
    alreadCount += 2;
  }
  return dummy.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const re = (l) => {
    let pre = null;
    let cur = l;
    while (cur) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    return pre;
  };
  let newL1 = re(l1);
  let newL2 = re(l2);
  const dummy = new ListNode(0, null);
  let p = dummy;
  let carry = 0;
  while (newL1 || newL2 || carry) {
    let sum = (newL1?.val ?? 0) + (newL2?.val ?? 0) + carry;
    if (sum > 9) {
      sum = sum % 10;
      carry = 1;
    } else {
      carry = 0;
    }
    const newNode = new ListNode(sum, null);
    p.next = newNode;
    newL1 = newL1?.next ?? null;
    newL2 = newL2?.next ?? null;
    p = newNode;
  }
  return re(dummy.next);
};

var doubleIt = function (head) {
  const re = (l) => {
    let pre = null;
    let cur = l;
    while (cur) {
      const curNext = cur.next;
      cur.next = pre;
      pre = cur;
      cur = curNext;
    }
    return pre;
  };
  let newL = re(head);
  const dummy = new ListNode(0, null);
  let p = dummy;
  let carry = 0;
  while (newL || carry) {
    let sum = (newL?.val ?? 0) * 2 + carry;
    if (sum > 9) {
      carry = Math.floor(sum / 10);
      sum = sum % 10;
    } else {
      carry = 0;
    }
    const newNode = new ListNode(sum, null);
    p.next = newNode;
    newL = newL?.next ?? null;
    p = newNode;
  }
  return re(dummy.next);
};

// 二叉树计算宽度 满二叉树编号 使用dfs 一个map记录每个深度的第一个节点编号，然后每次相减即可 如果过长，则每层重新编号防止溢出
function widthOfBinaryTree(root) {
  const map = new Map();
  let ans = 1;
  const dfs = (node, u, depth) => {
    if (!node) {
      return;
    }
    if (!map.has(depth)) {
      map.set(depth, u);
    }
    ans = Math.max(ans, u - map.get(depth) + 1);
    dfs(node.left, u * 2, depth + 1);
    dfs(node.right, u * 2 + 1, depth + 1);
  };
  dfs(root, 1, 1);
  return ans;
}

// 最小k个数
function smallestK(arr, k) {
  if (k === 0) {
    return [];
  }
  const getP = (arr, left, right) => {
    const pValue = arr[right];
    let l = left - 1;
    for (let i = left; i < right; i++) {
      if (arr[i] <= pValue) {
        l++;
        [arr[l], arr[i]] = [arr[i], arr[l]];
      }
    }
    [arr[l + 1], arr[right]] = [arr[right], arr[l + 1]];
    return l + 1;
  };

  const quickSelect = (arr, left, right) => {
    const p = getP(arr, left, right);
    if (p < k - 1) {
      return quickSelect(arr, p + 1, right);
    } else if (p > k - 1) {
      return quickSelect(arr, left, p - 1);
    } else {
      return;
    }
  };
  quickSelect(arr, 0, arr.length - 1); // 这里修改为k-1以便正确判断
  return arr.slice(0, k);
}
// 滑动窗口 长度最小的子数组
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let sum = 0;
  let left = 0;
  let ans = Infinity;
  // 向右走
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    // 超过了向右拉
    while (sum >= target) {
      // 每次都在条件外
      ans = Math.min(i - left + 1, ans);
      sum -= nums[left];
      left++;
    }
    // 条件内
  }
  return ans === Infinity ? 0 : ans;
};

// 子数组个数 -> 每次右标向右时，都是一个新的数组，左标向右走的时候都是新的子数组
// 713. 乘积小于 K 的子数组
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) {
    return 0;
  }
  let pro = 1;
  let left = 0;
  let ans = 0;
  for (let right = 0; right < nums.length; i++) {
    pro *= nums[right];
    while (pro >= k) {
      pro /= nums[left];
      left++;
    }
    ans += right - letf + 1;
  }
  return ans;
};

/**
 * @param {string} s
 * @return {number}
 */
// 无重复字符最长子串
var lengthOfLongestSubstring = function (s) {
  const length = s.length;
  if (length <= 1) {
    return length;
  }
  let left = 0;
  let sArr = [];
  let ans = 0;
  for (let i = 0; i < length; i++) {
    while (sArr.includes(s[i])) {
      sArr.shift();
      left++;
    }
    sArr.push(s[i]);
    ans = Math.max(ans, sArr.length);
  }
  return ans;
};

// 这道题是可以用map来记录窗口中的，但是其实每次右标向右移动，影响的范围其实就是nums[right] 对他进行判断即可，因为窗口里的数据都是判断好的，当然用map也能解决
// 2958 最多 K 个重复元素的最长子数组
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
  const map = new Map();
  let left = 0;
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) ?? 0) + 1);
    while (map.get(nums[i]) > k) {
      map.set(nums[left], map.get(nums[left]) - 1);
      left++;
    }
    ans = Math.max(ans, i - left + 1);
  }
  return ans;
};

// 找到最长的半重复子字符串 https://leetcode.cn/problems/find-the-longest-semi-repetitive-substring/
// 临界条件是什么就记录什么
/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function (s) {
  if (s.length === 1) {
    return 1;
  }
  let left = 0;
  let ans = 1;
  let same = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      same += 1;
    }
    while (same >= 2) {
      if (s[left] === s[left + 1]) {
        same -= 1;
      }
      left++;
    }
    ans = Math.max(ans, i - left + 1);
  }
  return ans;
};

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const a = ["a", "e", "i", "o", "u"];
  let left = 0;
  let num = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (a.includes(s[i])) {
      num++;
    }
    while (i - left >= 5) {
      if (a.includes(s[left])) {
        num--;
      }
      left++;
    }
    ans = Math.max(ans, num);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let left = 0;
  let count = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count++;
    }
    while (count > k) {
      if (nums[left] === 0) {
        count--;
      }
      left++;
    }
    ans = Math.max(ans, i - left + 1);
  }
  return ans;
};

// 最长重复子串，二分加定长滑动区间
var longestDupSubstring = function (s) {
  const map = new Map();
  let ans = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const stringItem = s.slice(i, j + 1);
      map.set(stringItem, (map.get(stringItem) ?? 0) + 1);
    }
  }
  for (let entry of map.entries()) {
    if (entry[1] >= 2 && entry[0].length > ans.length) {
      ans = entry[0];
    }
  }
  return ans;
};

// dp经典题
// 最大子数组和
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const length = nums.length;
  const dp = Array(length).fill(0);
  dp[0] = nums[0];
  let ans = nums[0];
  for (let i = 1; i < length; i++) {
    // if (nums[i] >= 0) {
    //   // 说不定dp[i-1]也是负数
    //   dp[i] = dp[i - 1] + nums[i]
    // } else {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    // }
    ans = Math.max(ans, dp[i]);
  }
  return ans;
};

// 最长回文子串 //区间DP
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindromeSubseq = function (s) {
  const length = s.length;
  const dp = Array.from({ length: length }, () => Array(length).fill(0));
  for (let i = length - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < length; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][length - 1];
};

// 2320. 统计放置房子的方式数
/**
 * @param {number} n
 * @return {number}
 */
var countHousePlacements = function (n) {
  const dp = Array(n + 1).fill(0);
  const mod = BigInt(1e9 + 7);
  dp[0] = 1n;
  dp[1] = 2n;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + (dp[i - 2] % mod);
  }
  return (dp[n] * dp[n]) % mod;
};

// 打家劫舍2
// 单独解决环形的部分，分类讨论
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob1 = function (nums) {
  const length = nums.length;
  if (length === 0) {
    return 0;
  }
  if (length === 1) {
    return nums[0];
  }
  if (length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const dp = Array(length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < length; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[length - 1];
};

var rob = function (nums) {
  const length = nums.length;
  const has0 = nums[0] + rob1(nums.slice(2, length - 1));
  const no0 = rob1(nums.slice(1));
  return Math.max(has0, no0);
};

var jewelleryValue = function (frame) {
  const r = frame.length;
  const l = frame[0].length;
  const dp = Array(r)
    .fill(0)
    .map(() => Array(l).fill(0));
  dp[0][0] = frame[0][0];
  for (let i = 1; i < r; i++) {
    dp[i][0] = dp[i - 1][0] + frame[i][0];
  }
  for (let j = 1; j < l; j++) {
    dp[0][j] = dp[0][j - 1] + frame[0][j];
  }
  for (let i = 1; i < r; i++) {
    for (let j = 1; j < l; j++) {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]) + frame[i][j];
    }
  }
  return dp[r - 1][l - 1];
};

// 返回下一个质数
const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const getPrime = () => {
  let curPrime = 2;
  return function () {
    while (true) {
      if (isPrime(curPrime)) {
        const ans = curPrime;
        curPrime++;
        return ans;
      }
      curPrime++;
    }
  };
};

const getNextPrime = getPrime();
console.log(getNextPrime());
console.log(getNextPrime());
console.log(getNextPrime());
console.log(getNextPrime());

// 列表转树
// 每次循环获取当前父id的item 递归
const dfs = (list, parentId) => {
  const ans = [];
  list.forEach((i) => {
    if (i.parent_id === parentId) {
      const node = {
        id: i.id,
        name: i.name,
        children: dfs(list, i.id),
      };
      ans.push(node);
    }
  });
  return ans;
};

// 示例数据
const list = [
  { id: 1, name: "Node 1", parent_id: null },
  { id: 2, name: "Node 2", parent_id: 1 },
  { id: 3, name: "Node 3", parent_id: 1 },
  { id: 4, name: "Node 4", parent_id: 2 },
  { id: 5, name: "Node 5", parent_id: 2 },
  { id: 6, name: "Node 6", parent_id: 3 },
  { id: 7, name: "Node 7", parent_id: 3 },
  { id: 8, name: "Node 8", parent_id: 4 },
];
const tree = dfs(list, null);
console.log(tree, "tree");
console.log(JSON.stringify(tree, null, 2));

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 超时
var threeSum = function (nums) {
  const ans = [];
  const length = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let k = j + 1; k < length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          ans.push([nums[i], nums[j], nums[k]]);
          while (k + 1 < length && nums[k] === nums[k + 1]) {
            k++;
          }
        }
      }
      while (j + 1 < length && nums[j] === nums[j + 1]) {
        j++;
      }
    }
    while (i + 1 < length && nums[i] === nums[i + 1]) {
      i++;
    }
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 找到了一组数后，双指针向前移动，跳过值相同的数
var threeSum = function (nums) {
  const ans = [];
  const length = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let l = i + 1;
    let r = length - 1;
    while (r > l) {
      if (nums[i] + nums[l] + nums[r] < 0) {
        l++;
      } else if (nums[i] + nums[l] + nums[r] > 0) {
        r--;
      } else {
        ans.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }
        while (r > l && nums[r] === nums[r - 1]) {
          r--;
        }
        l++;
        r--;
      }
    }
  }
  return ans;
};

// 按照版本号由小到大排序
const compareVersions = (versions) => {
  return versions.sort((a, b) => {
    const aVersions = a.split(".");
    const bVersions = b.split(".");
    const maxLength = Math.max(aVersions.length, bVersions.length);
    for (let i = 0; i < maxLength; i++) {
      const aNumber = Number(aVersions[i] ?? "0");
      const bNumber = Number(bVersions[i] ?? "0");
      if (aNumber === bNumber) {
        continue;
      } else {
        return aNumber - bNumber;
      }
    }
  });
};

console.log(
  compareVersions(["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"])
);

/**
 * @param {string} s
 * @return {number}
 */
// 32 最长有效括号
// 没做出来
// 使用栈
var longestValidParentheses = function (s) {
  const length = s.length;
  if (length === 0) {
    return "";
  }
  let ans = "";
  let leftCount = 0;
  let l = 0;
  for (let i = 0; i < length; i++) {
    if (s[i] === "(") {
      leftCount++;
    } else {
      leftCount--;
    }
    while (leftCount < 0) {
      if (s[l] === "(") {
        leftCount--;
      } else {
        leftCount++;
      }
      l++;
    }
    if (leftCount === 0) {
      const sTemp = s.slice(l, i + 1);
      if (sTemp.length > ans.length) {
        ans = sTemp;
      }
    }
  }
  return ans;
};
// 32 官解，参考
const longestValidParentheses = (s) => {
  let maxLen = 0;
  const len = s.length;
  const dp = new Array(len).fill(0);
  for (let i = 1; i < len; i++) {
    if (s[i] == ")") {
      if (s[i - 1] == "(") {
        if (i - 2 >= 0) {
          dp[i] = dp[i - 2] + 2;
        } else {
          dp[i] = 2;
        }
      } else if (s[i - dp[i - 1] - 1] == "(") {
        if (i - dp[i - 1] - 2 >= 0) {
          dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2];
        } else {
          dp[i] = dp[i - 1] + 2;
        }
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
};

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  nums = nums.sort((a, b) => {
    let S1 = Number(`${a}${b}`);
    let S2 = Number(`${b}${a}`);
    if (S1 > S2) {
      return -1;
    } else if (S1 < S2) {
      return 1;
    } else {
      return 0;
    }
  });
  return nums[0] ? nums.join("") : "0";
};

// 188合并两个有序数组
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  const ans = [];
  let mIndex = m - 1;
  let nIndex = n - 1;
  let cur = m + n - 1;

  while (0 <= mIndex && 0 <= nIndex) {
    if (nums1[mIndex] > nums2[nIndex]) {
      nums1[cur] = nums1[mIndex];
      cur--;
      mIndex--;
    } else if (nums1[mIndex] < nums2[nIndex]) {
      nums1[cur] = nums2[nIndex];
      cur--;
      nIndex--;
    } else {
      nums1[cur] = nums1[mIndex];
      cur--;
      mIndex--;
      nums1[cur] = nums2[nIndex];
      cur--;
      nIndex--;
    }
  }
  while (0 <= mIndex) {
    nums1[cur] = nums1[mIndex];
    cur--;
    mIndex--;
  }
  while (0 <= nIndex) {
    nums1[cur] = nums2[nIndex];
    cur--;
    nIndex--;
  }
};
console.log(
  merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3),
  "merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)"
);

// 判断对称二叉树
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
// 每次判断两个节点是否是镜像 并且从dfs（root，root）开始
var checkSymmetricTree = function (root) {
  const dfs = (nodeLeft, nodeRight) => {
    if (!nodeLeft && !nodeRight) {
      return true;
    }
    if (!nodeLeft || !nodeRight) {
      return false;
    }
    return (
      nodeLeft?.val === nodeRight?.val &&
      dfs(nodeLeft.left, nodeRight.right) &&
      dfs(nodeLeft.right, nodeRight.left)
    );
  };
  return dfs(root, root);
};

/**
 * @param {number[][]} isConnected
 * @return {number}
 */

// 省份数量
var findCircleNum = function (isConnected) {
  const row = isConnected.length;
  // const col = isConnected[0].length
  const isVisit = Array(row).fill(false);
  let ans = 0;
  const dfs = (n) => {
    for (let j = 0; j < row; j++) {
      if (!isVisit[j] && isConnected[n][j] === 1) {
        isConnected[n][j] = 0;
        isVisit[j] = true;
        dfs(j);
      }
    }
  };
  // 每次循环一个城市，递归将相关联的城市根据isConnected===1的设置为访问过
  for (let i = 0; i < row; i++) {
    if (!isVisit[i]) {
      ans += 1;
      dfs(i);
    }
  }
  return ans;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 下一个更大元素
var nextGreaterElement = function (nums1, nums2) {
  const length = nums2.length;
  const stask = [];
  const map = new Map();
  // 单调递减栈
  //单调栈最后一个元素
  for (let i = length - 1; i >= 0; i--) {
    while (stask.length !== 0 && nums2[i] > stask[stask.length - 1]) {
      stask.pop();
    }
    map.set(nums2[i], stask.length === 0 ? -1 : stask[stask.length - 1]);
    stask.push(nums2[i]);
  }
  return nums1.map((i) => map.get(i));
};

// 下一个更大元素 环形，将原数组扩大，取值时取余，栈里是索引
var nextGreaterElements = function (nums) {
  const n = nums.length;
  const ret = new Array(n).fill(-1);
  const stk = [];
  for (let i = 0; i < n * 2 - 1; i++) {
    // 单调栈用存取
    while (stk.length && nums[stk[stk.length - 1]] < nums[i % n]) {
      ret[stk[stk.length - 1]] = nums[i % n];
      stk.pop();
    }
    stk.push(i % n);
  }
  return ret;
};

// 根节点到叶子结点的路径和 只有在左右节点都为空的时候才是叶子结点！
function hasPathSum(root, targetSum) {
  if (!root) {
    return false;
  }
  let ans = false;
  const dfs = (node, v) => {
    if (!node) {
      return;
    }
    if (!node.left && !node.right && v + node.val === targetSum) {
      //最重要的一行判断
      ans = true;
      return;
    }
    dfs(node.left, v + node.val);
    dfs(node.right, v + node.val);
  };
  dfs(root, 0);
  return ans;
}

function maxProfit(k, prices) {
  const length = prices.length;

  const dp = Array.from({ length }, () =>
    Array.from({ length: k + 1 }, () => [0, 0])
  );

  for (let i = 0; i < length; i++) {
    dp[i][0] = [0, -Infinity];
  }

  for (let j = 1; j <= k; j++) {
    dp[0][j] = [0, -prices[0]];
  }

  for (let i = 1; i < length; i++) {
    for (let j = 1; j <= k; j++) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }
  return dp[length - 1][k][0];
}

// 扔鸡蛋
// 超时
var superEggDrop = function (k, n) {
  const map = new Map();
  const dfs = (k, n) => {
    if (k === 1) {
      return n;
    }
    if (n === 0) {
      return 0;
    }
    if (map.get(`${k}-${n}`)) {
      return map.get(`${k}-${n}`);
    }
    let res = Infinity;
    for (let i = 1; i <= n; i++) {
      const time = Math.max(dfs(k - 1, i - 1), dfs(k, n - i)) + 1;
      res = Math.min(res, time);
    }
    map.set(`${k}-${n}`, res);
    return res;
  };
  return dfs(k, n);
};

/**
 * @param {number} n
 * @return {number}
 */
// 斐波那契数列
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    const sum = (dp[0] + dp[1]) % (1e9 + 7);
    dp[0] = dp[1];
    dp[1] = sum;
  }
  return dp[1] % (1e9 + 7);
};

/**
 * @param {number} n
 * @return {number}
 */
// 正整数拆分
var integerBreak = function (n) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], (i - j) * j, dp[i - j] * j);
    }
  }
  return dp[n];
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 最近公共祖先节点
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(node.left, p, q);
  const right = lowestCommonAncestor(node.right, p, q);
  if (left && right) {
    return root;
  }
  return left ?? right;
};

// 区间DP
/**
 * @param {string} s
 * @return {number}
 */
// 516最长回文子串
var longestPalindromeSubseq = function (s) {
  // dfs(i,i) = 1
  // dfs(i,j) = dfs(i+1,j-1)
  // dfs(i,j) = max(dfs(i+1,j),dfs(i,j-1))
  const length = s.length;
  const dp = Array.from({ length: length }, () => Array(length).fill(0));
  for (let i = length - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < length; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][length - 1];
};

// 1039
var minScoreTriangulation = function (values) {
  // dfs(i,j) =min(k-(i,j): dfs(i,k)+v[i]*v[j]*v[k]+dfs(k,j))

  const length = values.length;
  const dp = Array.from({ length }, () => Array(length).fill(Infinity));

  for (let i = 0; i < length - 1; i++) {
    dp[i][i + 1] = 0;
  }

  for (let i = length - 3; i >= 0; i--) {
    for (let j = i + 2; j < length; j++) {
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + values[i] * values[j] * values[k] + dp[k][j]
        );
      }
    }
  }
  return dp[0][length - 1];
};

// 猜数字大小 375
var getMoneyAmount = function (n) {
  // dfs(i, j) =k max(0,dfs(i,k-1)+k,k+dfs(k+1,j))
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

  for (let i = n; i >= 1; i--) {
    for (let j = i; j <= n; j++) {
      if (i === j) {
        dp[i][j] = 0;
      } else {
        for (let k = i; k <= j; k++) {
          dp[i][j] = Math.min(
            dp[i][j],
            Math.max(
              0,
              k - 1 <= j && k - 1 >= i ? dp[i][k - 1] + k : 0,
              k + 1 <= j && k + 1 >= i ? dp[k + 1][j] + k : 0
            )
          );
        }
      }
    }
  }

  return dp[1][n];
};

const isHuiwen = (s) => {
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    if (s[i] === s[s.length - 1 - i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

// 分割回文子串 132
// 超时
var minCut = function (s) {
  // dfs(i,j) = min(1 + dfs(i,k) + dfs(k,j))
  const length = s.length;
  const dp = Array.from({ length }, () => Array(length).fill(0));
  for (let i = length - 1; i >= 0; i--) {
    for (let j = i; j < length; j++) {
      if (isHuiwen(s.slice(i, j + 1))) {
        dp[i][j] = 0;
      } else {
        let min = Infinity;
        for (let k = i; k < j; k++) {
          if (k === i) {
            min = Math.min(min, 1 + dp[k + 1][j]);
          } else if (k === j - 1) {
            min = Math.min(min, 1 + dp[i][k]);
          }
          min = Math.min(min, 1 + dp[i][k] + dp[k + 1][j]);
        }
        dp[i][j] = min;
      }
    }
  }
  return dp[0][length - 1];
};

// 96. 不同的二叉搜索树
function numTrees(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      //  j 从 0-i-1 遍历，用 i 个节点构建 BSTBSTBST，除去根节点，剩 i−1 个节点构建左、右子树，左子树分配 0 个，则右子树分配到 i-1 个……以此类推。
      dp[i] += dp[i - 1 - j] * dp[j];
    }
  }
  return dp[n];
}
