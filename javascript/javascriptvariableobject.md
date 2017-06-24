# 关于javascript中的变量对象和活动对象
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/javascriptvariableobject/ "点击我")

        前面的文章说到， 执行上下文的创建阶段，主要有三个内容：

        1、创建变量对象；2、初始化作用域链；3、确定this的指向。

        执行上下文的执行阶段，也有三个内容：

        1、变量赋值；2、函数引用；3、执行其他代码。

在这里先说一个前提，我提到的函数调用，说的是执行上下文的第一阶段，创建阶段（还没开始执行函数体相关的代码），提到的函数执行，说的是执行上下文的第二阶段，执行阶段（开始执行函数体相关的代码）。

其实在说到执行上下文中的的变量对象的时候，我印象中会冒出来两个英文简写：VO和AO。

        VO：Variable Object的简写，就是变量对象。

        AO：Activation Object的简写，叫做活动对象。

        这两个东西有什么区别呢？

        我的理解是，他们的区别就是在于执行上下文的不同生命周期阶段，变量对象VO在执行上下文的创建阶段，而活动对象AO在执行上下文的执行阶段。

        先说一下变量对象，它的结构大致如此，在函数被调用的时候被创建：
```javascript
VO:{
    arguments:Arguments,
    FunctionName:reference to function FunctionName(){},
    Variables:undefined
}
```
        VO（变量对象）包含：函数的形参（arguments）、函数声明（FunctionDeclaration, FD）、变量声明（VariableDeclaration，var）三个内容。

        简单来说，举个例子：
```javascript
//声明example函数
function example(x){
    var a = 10;
    function plus(){
        return a + x;
    }
    return plus();
}
//调用example函数
example(5);
```
        当调用example函数的时候，进入执行上下文的创建阶段，创建的变量对象为（自己看看什么是函数的形参、函数声明和变量声明）：
```javascript
VO:{
    arguments:{x:undefined},
    plus:reference to function plus(){},
    a:undefined
}
```
        当example函数开始执行的时候，进入执行上下文的执行阶段，变量对象就会被激活，首先通过arguments属性初始化成为活动对象AO：
```javascript
AO:{
    arguments:{callee:example,x:5,length:1},
    plus:reference to function plus(){},
    a:undefined
}
```
        当然了，arguments属性的值是Arguments对象，对于VO来说，由于创建阶段只是形参，所以VO只有x一个undefined的值，而通过传入确定的实参5初始化后，AO中的Arguments就多了指向自身函数callee和length两个属性了。

        当然，AO对象是随着执行代码的执行过程中而变化的，随着代码的执行，变量开始初始化，下一步AO就会变成：
```javascript
AO:{
    arguments:{callee:example,x:5,length:1},
    plus:reference to function plus(){},
    a:10
}
```
        当还有其他变量的时候，执行过程自行理解一下就行了。

        所以上下文的执行阶段：变量赋值、函数引用、执行其他代码。这个过程也可以轻易理解了。

        最后，想说一下全局上下文（或者叫做全局执行上下文）的VO和AO，其实大家也可以知道，其实我们执行所有的代码，都是基于一个全局上下文上的，只要你不退出全局上下文（例如浏览器的话全局对象就是window，你不关闭窗口的话，全局上下文就不会跳出执行上下文栈），就一直都在全局执行上下文的执行阶段了，所以执行的阶段就已经是AO了。其次，本身没有arguments属性，这个也可以容易理解，全局对象它不是函数。

