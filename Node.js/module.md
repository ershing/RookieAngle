# 关于Node.js中的模块机制
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/nodejsmodule/ "点击我")

        为什么要模块，因为它对于代码的复用和解耦有着很关键的作用，关于node.js中的模块加载系统，其实是一个很简单的东西，它是 CommonJS规范的一种实现。所以在说Node.js的模块加载机制之前，先说一说javascript的三种常见的模块化规范：1、CommonJS；2、AMD；3、CMD。

        不拐弯，直入主题，先说CommonJS，它对于javascript模块化有着很重要的作用，它的模块标识是module，模块导出接口是exports，而对于引入模块，只需要一个非常简单的全局性方法require，好了，举个简单的例子：

        先写一个模块文件 calculator.js，内容如下（只是举例，写法不严谨）：
```javascript
// calculator.js 
function plus(a,b){
    return a+b;
}

function minus(a,b){
    return a-b;
}

function times(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

module.exports = { 
    plus,
    minus,
    times,
    divide,
}
```
        再建一个test.js 的文件，它会引入 calculator这个模块，内容如下：
```javascript
// 引入calculator模块
var calculator = require('calculator');

//使用calculator模块的plus方法
var plusResult = calculator.plus(1,2);

//打印结果
console.log(plusResult);   // 3
```
        就是非常简单的用法，关于它实现会在最后详说。

        好了，现在就到说说AMD规范了，为啥会出现这个规范呢？CommonJS不就够了吗？那是因为，CommonJS的require方法引入模块是同步的，如果我放在前端的话，那就非常不适合了，特别文件如果要同步加载，等这么久时间是非常影响用户体验的。所以CommonJS是适用于服务器端的，所以在前端看来，就需要像AMD这种异步模块加载的方式了。

        AMD加载模块也是require方法，但是由于异步，所以多了一个回调参数，对于上面的例子，加载的方法就变为大概这样：
```javascript
// 引入calculator模块
require(['calculator'],function(calculator){

    //使用calculator模块的plus方法
    var plusResult = calculator.plus(1,2);

    //打印结果
    console.log(plusResult);   // 3
});
```
        require的第一个参数是数组，传入的是不同的模块，而第二个就是回调函数，异步加载模块后就会执行。RequireJS就是AMD规范的一个典型实现代表。模块的加载路径需要在头部先用require.config来配置。

        而AMD的模块导出方法，就要用到define了，将前面例子改为大概如下：
```javascript
// calculator.js 
function calculator(){
    var plus = function(a,b){
        return a + b;
    }
    return {
        plus:plus
    }
}

define(calculator);
```
        当然了，如果这个模块也依赖其他模块，就在define的第一个参数传入模块数组，第二个参数就是回调参数了，和加载形式差不多，其实都是类似的，只不过改了一下写法而已。

        至于CMD，其实和AMD差不多，关于CMD，SeaJS就是它的实现，至于RequireJS和SeaJS两者的差别，可以参考https://github.com/seajs/seajs/issues/277

        好了，最后要回过头来说Node.js的模块机制了。

        因为Node.js的模块机制就是CommomJS的一种实现，所以很多时候我们都可以看到这样的引用：
```javascript
// 读取一个文件内容
const fs = require('fs');
var content = fs.readFileSync('./book.js',{encoding:'utf8'});
        而模块的导出，有两种方式：

//example.js文件
module.exports = {name:"jack"};   // 方式一
exports.name = "jack";    // 方式二
```
        引入文件之后，可以用example.name获得模块的输出内容。但是，我们不能写成这种形式：
```javascript
exports = {name:"jack"};
```
        因为本来模块的exports属性绑定在module.exports上的，如果你这样写，就等于改写了exports属性了，所以不能导出模块内容了，所以我们可以明确知道，module.exports才是模块真正的导出接口，忌用exports属性来导出模块，至于理解它们两者的关系，它们的假设实现为：
```javascript
function require(/* ... */) {
    const module = { exports: {} };
        ((module, exports) => {
        // 模块代码在这。在这个例子中，定义了一个函数。
        function someFunc() {}
        exports = someFunc;
        // 此时，exports 不再是一个 module.exports 的快捷方式，
        // 且这个模块依然导出一个空的默认对象。
        module.exports = someFunc;
        // 此时，该模块导出 someFunc，而不是默认对象。
    })(module, module.exports);
    return module.exports;
}
```
        我们可以看到，我们用require引入模块的时候，里面一开始定义了这样一个变量const module = { exports: {} }，而最后返回的是module.exports属性值，所以可以轻易理解为这个就是模块的出口，而中间执行了一段函数，就是将实际模块引入，而模块内的内容，就有module和exports两个形参，如果你改变了exports这个值，那么它不会对原来的module有任何影响，但是你用module.exports就对原来module有插入值的作用，当然，你用exports.property = something也会对原module有插入值的作用。如果你想同时用这两个方式：
```javascript
module.exports = {name:"Jack"};   // 方式一
exports.name = "Kate"   // 方式二
```
        根据上面的假设实现，在模块代码中，我们也可以知道，module.exports已经定义了模块的出口内容，而exports.name就不会再有意义了。

        好了，最后说一下Node.js的require加载方式，原生模块直接写模块名称，而自定义模块就要写相对路径了，当然，加载后它都会缓存起来的，它的逻辑在网上找个图就表示很清楚了，如下：
<div align=center><img src="http://www.infoq.com/resource/articles/nodejs-module-mechanism/zh/resources/image1.jpg" alt="require流程" /></div>

 
