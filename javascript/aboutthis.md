# 关于javascript中this的指向
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/aboutthis/ "点击我")

        学习javascript，必不可少的肯定要理解this的指向。要学习this指向之前，就要先理解了我前面写的几篇文章，会更容易理解this的指向。

        前面的文章说到， 执行上下文的创建阶段，主要有三个内容：

        1、创建变量对象；2、初始化作用域链；3、确定this的指向。

        前两个内容我都作了详细的解析了，在这里，是时候要说一下第三个内容了，确定this的指向。其实this的指向从一些理论知识上理解，是很复杂的，看过不少文章都没有说的很清楚，反而说得人懵逼了。其实，this的指向是非常简单的，明确了它的规律，不要被太多代码表达形式的改变而影响了正常的认识思维，那就可以了。

        好了，来个普遍例子：
```javascript
//全局环境
var a = 10;
function inner(){
    var a = 20;
    console.log(this.a);
}
inner();
```
        当然了，打印结果是10，this就是指向全局对象。

        好了，该解析this了，我们都知道this的指向是函数被调用的时候确定的。

        简单直接说结论：**通过对象访问属性的方式执行函数，this就是指向这个对象，其他情况，严格模式下都是指向undefined，非严格模式下都是指向全局对象。**

        先解析上面例子，上面的inner函数是在全局环境中直接调用的：inner(   )，大家可以理解这个调用，就是这一对方括号（），所以它是指向全局对象，所以this.a就是10。
```javascript
//全局环境
var a = 10;
var example = {
    a : 20,
    b : this.a + 10
}
console.log(example.b);
```
        打印结果是多少？30吗？错了，不是通过example这个对象访问b属性，所以b里面的this就是指向example吗？错了。

        我说的是对象访问属性的方式执行函数，你这个b属性内容不是函数。由于example是在全局环境中声明的，所以里面的this就是指向全局对象，或者说，this的确定是函数被执行时候确定的，你的函数呢？往上找，就是全局对象这个大函数了，所以这个this就是指向全局对象。

        当然了，如果你将example放进去某个函数里面，对照一下我的结论，就会知道这个this在严格模式下就会指向undefined，非严格模式就是指向全局对象。例子如下：
```javascript
//非严格模式下的全局环境
var a = 10;
function outer(){
    var example = {
        a : 20,
        b : this.a + 10
    }
    return example.b;
}
outer();//打印结果为20
```
```javascript
//严格模式下的全局环境
'use strict'
var a = 10;
function outer(){
    var example = {
        a : 20,
        b : this.a + 10
    }
    return example.b;
}
outer();//执行会报错，因为this指向undefined
```
        还问为什么？因为outer函数被执行时候这个this才确定啊，而outer这个函数是单独调用啊，直接outer(  )这样调用啊，所以就是结论中那样啊。

        好了，那怎样是属于对象访问属性的方式执行函数呢？再来例子：
```javascript
//全局环境
var a = 10;
var example = {
    a : 20,
    b : function(){
        return this.a;
    }
}
console.log(example.b());
```
        好了，这次打印结果是20了，因为通过了example访问b属性方式执行函数的，通过这个一点运算符的属性访问方式，叫做成员访问。稍微改改再来例子：
```javascript
//全局环境
var a = 10;
var example = {
    a : 20,
    b : function(){
        return this.a;
    }
}
var c = example.b;
console.log(c());
```
        还是20吗？不是了，非严格模式是10，严格模式报错（后面都是非严格模式的例子），因为调用函数c，前面只是通过example.b将函数的地址传给了c而已，你调用函数时候，还是单独调用啊。开始懂了对不对，再来例子：
```javascript
//全局环境
var a = 10;
function runAway(){
    return this.a;
}
var example = {
    a : 20,
    b : runAway
}
console.log(example.b());
```
        如果你不假思索就能说是20的话，证明你已迈出了一大步了，同一个道理，是通过对象访问属性的方式执行函数的，我管你的b属性是直接指向函数，还是通过函数声明指向函数的，反正你的this就是指向对象example。

        好了，结合上面的再改一改例子：
```javascript
//全局环境
var a = 10;
function runAway(){
    return this.a;
}

function worker(fn){
    fn();
}
var example = {
    a : 20,
    b : runAway
}
worker(example.b);
```
        可能你会说，通过example.b这样的的方式，我不管你有没有跳出来的runAway，this肯定是指向example啦，那就要重温一下我的结论了，我说的是通过对象访问属性的方式执行函数，你执行了吗，你有一对方括号吗？可能你会说，他们传入去worker函数，里面就会加一对方括号执行啊，那就错了。

        通过这种方式的执行函数，其实已经变味了，这种情况和上面的例子：var c = example.b，然后c( )执行函数式一样的，你只不过通过example.b将这个函数地址传入了worker函数，然后执行而已。

        所以上面这个例子，就是结论中的其他情况咯，严格模式this指向undefined（当然这个例子会报错，因为undefined没有a属性），非严格模式指向全局对象（当然这个例子会打印undefined，因为全局对象没有b属性）。

        好了，最后再举一下其他例子：
```javascript
//全局环境
var a = 10;
var example = {
    a : 20,
    b : function(){
        return this.a;
    }
}
//例子一
console.log(example.b()); //打印结果为20
//例子二
console.log((example.b)()); //打印结果为20
//例子三
console.log((false || example.b)()); //打印结果为10
```
        好了，在例子一中，很清楚明白就是常规的this指向了example。

        例子二中，你加了一个括号也没用啊，我没有将它的函数地址赋值其他什么变量啊，所以和例子一也是一样的。

        至于例子三，我们可以这样理解，你在括号里面进行了一些其他运算，所以通过example.b这个方式只是拿了函数地址出来运算，所以在例子三中，括号的结果是example.b这个结果，所以是拿到了一个函数的地址，最后调用的时候还是单独调用啊，就类似前面例子的worker函数那样啊。

        网上还有很多像例子三那样的古灵精怪的例子，其实很简单，你运算过了，最后出来的东西再加方括号调用，就是单独调用了。

        最后，好像忘了个很常用的构造函数的this指向：
```javascript
//先来个构造函数Mankind
function Mankind(name){
    this.name = name;
}
//实例化对象Dad
var Dad = new Mankind('BaBa');
console.log(Dad.name); //打印结果为BaBa
```
        很明白了，通过构造函数实例化对象，构造函数里面的this就是指向这个实例化对象了。
