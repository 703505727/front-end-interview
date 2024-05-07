function render(template, data) {
    // 模板字符串正则 /\{\{(\w+)\}\}/, 加 g 为全局匹配模式, 每次匹配都会调用后面的函数
    let computed = template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
        // match: 匹配的子串;  key：括号匹配的字符串
        return data[key];
    });
    return computed;
}

// 测试
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
    name: "张三",
    age: 18
}
console.log(render(template, data)); // 我是张三，年龄18，性别undefined

