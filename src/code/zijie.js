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
