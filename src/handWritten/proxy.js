


// 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
// const res = obj[1][2][3] + 4

const createProxy = (value = 0) => {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            // 如果为 Symbol.toPrimitive 那么返回一个函数,这个函数直接返回 value
            if (propKey === Symbol.toPrimitive) {
                return () => value
            }
            return createProxy(value + Number(propKey))
        }
    })
}
// 测试一下
const obj = createProxy()
const res = obj[1][2][3] + 4 // 10


// const res = obj[1][2][3]() // 10
const createProxy2 = (value = 0) => {
    return new Proxy(function () { }, {
        get(target, propKey, receiver) {
            return createProxy(value + Number(propKey)) //这个和之前一样 递归返回
        },
        apply(target, thisArg, argArray) {
            return value // 进入 apply 陷阱,直接返回 value
        }
    })
}
const obj2 = createProxy()
const res2 = obj[1][2][3]() // 测试一下 完美通过

