1、JS es6 以上语法都有哪些
2、为什么会有变量提升（js执行的流程）
使用变量提升有如下两个好处：
（1）提高性能
    解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间。
（2）容错性更好
    声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行。

3、性能指标的具体值是什么多少
4、linehight为什么会有居中的效果
5、不可以增加属性的对象 
    判断一个对象是否可以拓展属性 Object.isExtensible(obj)
    使一个对象不可拓展 Object.preventExtensions(obj)
6、如何使用es5实现 async await
7、如何停止渲染


编译型语言 VS 解释型语言
    主要问题是没有团体或者组织规定这些；例如：编译型语言和解释型语言的定义以及如何划分。 而这两个都是概念。
    所以根据概念，编译型语言是代码在运行前编译器将人类可以理解的语言（编程语言）转换成机器可以理解的语言。
    解释型语言也是人类可以理解的语言（编程语言），也需要转换成机器可以理解的语言才能执行，但是是在运行时转换的。所以执行前需要解释器安装在环境中；但是编译型语言编写的应用在编译后能直接运行。
    许多人认为解释型语言意味着当遇到程序中行号为xyz时直接将其传给CPU就能运行；但是事实不是这样。所有的编程语言都是为人类创建的。他们是人类能够理解的。你必须将编程语言转换为机器语言。编译器获取整个代码，转换它，做合适的优化并且创建一个可以运行的输出文件。编译器根据上下文来转换语句。

JavaScript的圣经——MDN明确地说JavaScript是一个解释型语言
