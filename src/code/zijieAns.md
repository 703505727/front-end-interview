// 新加坡准备
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

9、准备一下 bff 的登陆
10、前端工程化做了哪些内容？
viteCSS 工程化；代码开发体验如 alias 配置、auto-import；项目规范如 prettier、ESLint、husky
除了这些还有吗？因为你提到的这些其实都...xxx$$?有没有 CICD 之类的
有，我们在 XXX 中使用脚手架创建项目，自动会连接到 gitlab 创建仓库，同时也会链接到云效 CI/CD 平台的版本号
11、类型判断
12、项目内容准备：https://juejin.cn/post/7298218459795734582?searchId=20240503180810C1C94F3B7E914F55F9A6
13、实现一个抢红包的功能、单例模式、发布订阅模式

14、数据类型判断
typeof null // Objest 历史问题 typeof 的判断方式是底层的后三位机器码，null 所有机器码都为 0，而 obj 的机器码后三位也是 0，所以会判断相等
instanceof 判断一个对象是否是某个类
const number = 42;  
 number instanceof Number // false 因为不是一个对象，只是一个值

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
点击刷新按钮或者按 F5： 浏览器直接对本地的缓存文件过期，但是会带上 If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
用户按 Ctrl+F5（强制刷新）： 浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
地址栏回车： 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。

17、海外用户和国内用户有什么区别？
文化差异: 内容偏好、设计审美、节日习俗等方面海外用户和国内用户会有较大不同。
语言差异: 面对多语言环境，需要提供本地化的产品界面和内容。
互联网习惯: 如支付习惯（PayPal、信用卡等）、社交平台（Facebook、Twitter、Instagram 等）。
法律法规: 数据保护（GDPR）、内容审查等法规在不同国家/地区有显著差异。

18、如果你做出海业务的话，你需要从哪些方面考虑
市场研究: 明确目标市场、用户需求、当地竞争态势以及市场准入要求。
本地化策略: 包括语言翻译、内容适配、文化差异的桥接。
法律遵从: 遵守

19、Proxy 1.一次只能对一个属性进行监听，需要遍历来对所有属性监听。这个我们在上面已经解决了。 2. 在遇到一个对象的属性还是一个对象的情况下，需要递归监听（Proxy 会触发 get）。访问 proxyObj 的深层属性时，并不会触发 set。所以 proxy 如果想实现深度监听，也需要实现一个类似上文的 Observer 的递归函数，使用 proxy 逐个对对象中的每个属性进行拦截，具体的实现逻辑可以参考上文。 3. 对于对象的新增属性，需要手动监听 4. 对于数组通过 push、unshift 方法增加的元素，也无法监听

Promise 的优点和特性
链式调用（Chaining）: Promise 支持链式调用，这意味着你可以通过 .then() 方法顺序地添加多个回调，依次进行异步操作，避免层层嵌套（俗称“回调地狱”）的问题。
统一的错误处理（Error Handling）: 使用 .catch() 方法，可以在链的末端捕获前面任何步骤中发生的错误，简化了错误处理的流程。
状态的不可逆（Immutability）: Promise 对象有三种状态——pending（等待态）、fulfilled（完成态）、rejected（拒绝态），一旦从等待态变为完成态或拒绝态，其状态就不会再变化，保证了处理逻辑的可靠性。
同步控制异步（Synchronous Control of Asynchronous Operations）: Promise 本身是同步的，但它可以用来控制异步操作，同时它提供的方法比如 all, race, allSettled, any 等允许更灵活的控制多个异步操作。
更好的异步逻辑流程控制: 相较于单纯的回调，Promises 允许你在需要时顺序或并行执行异步操作，设计更清晰、更易于维护的异步逻辑。
调试友好和工具支持: Promise 对象更加调试友好，许多开发工具都支持 Promise 调试。你可以在开发者工具中检查 Promise 对象的当前状态及其值。
由于 Promise 提供了更加直观和强大的 API，它们已经成为现代 JavaScript 异步编程的核心部分。

作用域（Scope）
全局作用域（Global Scope）: 在最外层定义的变量具有全局作用域，这意味着在代码的任何地方都可以访问到这些变量。
函数作用域（Function Scope）: 函数作用域是指在函数内定义的变量只能在函数内部访问，对外部则不可见。每个函数在被调用时会创建一个新的作用域。
块级作用域（Block Scope）: ES6 引入了 let 和 const 关键字，允许我们在块级作用域中声明变量，即这些变量只在包含它们的一对大括号内部有效。

20、图片旋转、缩放
transform: rotate(90deg);
transform: scale(0.5);

    // 无限旋转
    @keyframes spin { //每一帧
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
    }
    .infinite-rotate {
        animation: spin 2s linear infinite;
        // 帧动画，时长，速度曲线，循环次数
    }

21、bind 函数绑定的 this 是永久性的，一次性的。后面继续链式调用没用了，不会再绑定了。

// 算法题
斐波那契数列
力扣 343 https://programmercarl.com/0343.%E6%95%B4%E6%95%B0%E6%8B%86%E5%88%86.html
53 题最大子数组和
179
632 最小区间 滑动窗口
103 双端队列，每次用 shift 取出数组，然后根据奇偶，将答案 push 或者 unshift 放入答案数组，遍历顺序不变
60 回溯 + 减枝
373 多路并归

網路 OSI 七層中每層架構及用途
什麼是 handshake 機制

一个由 01 表示的二维数组作为地图，0 代表水，1 代表陆地，有一天水平面上升了，淹掉了所有的岛，但是和陆地相连（在二维数组边缘）的部分不会被淹没，求水平面上涨后的地图
从二维数组周围绕一圈 dfs，记录下与陆地相连的部分，再把其他地方都改成水就可以

技术生态、行业生态

K 个一组链表反转

二叉树中两个数，找最接近的公共父节点。

// 行为面试题
1、TikTok 和其他 app 有什么不同
2、list top 3 biggest challenges tiktok is facingtodav and explain why
4、why tiktok 和你现在公司之间对比
praise them for their position in the industry
passion for this industry, for this area, determination to devote my self to this industry
what you want to learn/get from them
5、why leave current job
6、what are you looking for
7、why pivot to tech industry? what do you think about the role of trust and safety?
8、tell me a time when you are not given enough data.
9、为什么跳槽
10、Tell me about a project you are proud of
11、How to make effective communication in a team?
12、What is your future career developmentplan?
13、自己的优缺点
14、感谢的语句
15、接受自己要强调竞争力、岗位要求、表达能力、结构性思维
16、使用 STAR 法则描述一个困难、一段经历
17、职业规划、与他人意见不一致时如何处理
18、如何解决 conflicts，过去有什么 failure，学到了什么。
19、对这个岗位的理解跟对 tiktok 的理解

1、英语自我介绍
good afternoon, It's a pleasure for me to be here in front of you to present myself. my name is DengGuowei, u also can call me Aron, and I hail from Guangdong Province, China. I am a graduate of South China University of Technology, where I majored in Material forming and Control Engineering with a minor in Computer Science. During my time at university, I consistently maintained a position within the top three of my class in terms of GPA.

Beside, I actively participated in a varity of competitions at both the provincial and national levels, and I got some impressive achievements. I also took part in entrepreneurial projects.

I was born in 1998, after completing my four-year degree in Guangzhou, I kick-started my career at Huawei in Guangzhou, where I led a front-end development team. and I manage all factes of thing not limited to froned-end development. I grew up a lot during this period. about a year and a half later, i relocated to bejing to join Alibaba Local Services company as a front-end developer。now, I take on the role of product lead for DABAI series, which consists of five distinct products xxxx,

During my tenure, I frequently engaged in team development as well as tasks related to performance optimization and monitoring. In my free time, I enjoy playing basketball and listening to music. Playing basketball strengthens my body, while music allows me to relax after a day’s work.

That’s all about my self-introduction.I greatly appreciate the opportunity to interview with you today.Thank you for your attention.

2、为什么离开
As a frontend engineer responsible for managing a segment of Alibaba's servers, I've observed that Eleme's growth has slowed down compared to the past. Considering my career life, I believe that TikTok offers a more promising opportunity for me to elevate my career to a higher level.

3、为什么来新加坡
I want to work in SG, because it offers dynamic opportunity and a diverse culture, whit it strong economy and stable polities. i believe
it is the ideal place for me to learn grow and contribute to the company's success. besides, i can practise my English here and if my spoken
English is not good enough, i can still use Chinese to chat whit others. also, i come from guangdong china and live in beijing, the weather of SG is more suitable for me.

4、为什么选择 TikTok
i chose tiktok for several reasons, Firstly, Tiktok is growing really fast now, and the scope of the team i apply for is important and essential, it is a opportunity to pursue my career. Secondly, as we all know, tiktok owns a large team and it is top 1 in SG among those
Chinese IT companies like Lazada and temu(泰木)。Lastly, TikTok is a company with a diverse culture, tikTok's innovation culture excites me.
working whit Tiktok in such a dynamic market will allow me grow fast.

5、如何解决 conflicts，过去有什么 failure，学到了什么
In my previous role as a project manager, we encountered conflicts within the team regarding project priorities. I addressed these conflicts by organizing a meeting where everyone could openly discuss their concerns and perspectives. By openning communication and understanding different viewpoints, we were able to reach a consensus on how to move forward. fininaly, we determined the priorties about our task. This experience taught me the importance of proactive communication and the value of considering diverse perspectives in conflict resolution.

6、最骄傲的项目是
The project I am most proud of is XXX, because it was a project I built from zero. it is a AI+ project, it can help people increase daliy work efficiency.

7、职业规划
Firstly, I aim to enhance my skills in front-end technology。i aspire to become an expert in the field within about five years and about
eight years, i hope to have developed a product that not only impacts the team but also contributes significantly to the company.
Secondly, I wish to grow in terms of soft skills, such as improving my communication abilities, interpersonal relations, and management skills.

8、优缺点
Firstly, I am a hard-working and tenacious person. i take my work very seriously and stick to thing to get them done no matter what
challenges i encounter. I always can finish my work whatever it take.
Secondly, I have a strong adaptability, i am always able to adjust to the new environment and ensure tasks are completed effectively.

As for a disadvantage, I can be quite direct in my communication, sometimes, this directness may cause discomfort in daliy work interactions. However, outside of work, I maintain friendly relations with my colleagues, eat together drink together。


// 普通准备
