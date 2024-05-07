const get = (obj, path, defaultValue) => {
    let newPath = []
    if (Array.isArray(path)) {
        newPath = path
    } else {
        newPath = path.replace(/\[/g, ".").replace(/\]/g, "").split(".")
    }
    return newPath.reduce((pre, cur) => {
        console.log(pre, cur)
        return pre[cur]
    }, obj) ?? defaultValue
}

console.log(get({ a: [{ b: { c: 0 } }] }, "a[0].b.c"))
/**
 * { a: [ { b: [Object] } ] } a
 * [ { b: { c: 0 } } ] 0
 * { b: { c: 0 } } b
 * { c: 0 } c
 * 0
 */