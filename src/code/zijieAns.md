1、如何解决消息队列信息积压
    水平拓展消费者
    优化消费者处理消息的速度
    限制消息产生的速度
    监控预警、提前发现问题优化

2、你的优点缺点？请谈谈您的个人优势和特长？
3、通过几轮面试 对业务的了解？
4、有什么压力大的事？怎么缓解？
5、职业规划？
6、您在项目开发过程中遵循哪些流程和方法论
7、为什么使用合成事件
● 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
● 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

8、图片懒加载如何判断进入可视区
    intersectionObserver 实例化时回调函数的入参有个 isInteresting 参数
    getBoundingClientRect 获取元素到视口的相对信息

    如果图片获取失败，添加error监听，自定义一个属性 data-tried 如果已经尝试没有刷新过，则将原data-src的链接加上尝试次数并且加上当前时间，防止游览器缓存影响，然后还是不行就加个默认图片

9、准备一下bff的登陆
10、前端工程化做了哪些内容？
    viteCSS工程化；代码开发体验如alias配置、auto-import；项目规范如prettier、ESLint、husky
    除了这些还有吗？因为你提到的这些其实都...xxx$$?有没有CICD之类的
    有，我们在XXX中使用脚手架创建项目，自动会连接到gitlab创建仓库，同时也会链接到云效CI/CD平台的版本号
11、类型判断
12、项目内容准备：https://juejin.cn/post/7298218459795734582?searchId=20240503180810C1C94F3B7E914F55F9A6
13、实现一个抢红包的功能、单例模式、发布订阅模式

14、数据类型判断
    typeof null // Objest 历史问题 typeof的判断方式是底层的后三位机器码，null所有机器码都为0，而obj的机器码后三位也是0，所以会判断相等
    instanceof 判断一个对象是否是某个类
        const number = 42;  
        number instanceof Number // false  因为不是一个对象，只是一个值
  
        const numberObj = new Number(42);  
        numberObj instanceof Number // true 是一个对象

    toString()
    Object.prototype.toString.call(42) // "[object Number]"  
    Object.prototype.toString.call("Hello, world!") // "[object String]"  
    Object.prototype.toString.call(true) // "[object Boolean]"  
    Object.prototype.toString.call(undefined) // "[object Undefined]"  
    Object.prototype.toString.call(null) // "[object Null]"  
    Object.prototype.toString.call(Symbol()) // "[object Symbol]"  
    Object.prototype.toString.call({}) // "[object Object]"  
    Object.prototype.toString.call([]) // "[object Array]"  
    Object.prototype.toString.call(function() {}) // "[object Function]"  

15、水平垂直的实现都有哪些

16、点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？
点击刷新按钮或者按 F5： 浏览器直接对本地的缓存文件过期，但是会带上If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
用户按 Ctrl+F5（强制刷新）： 浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
地址栏回车： 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。

