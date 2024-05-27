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
    if (map(pre)) {
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
