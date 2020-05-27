# 关于javascript中的toString()和valueOf()
###### 我GitHub上的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/tostring-and-valueof/ "点击我")

        关于javascript中的toString()和valueOf()两种方法，其实早在开始读红宝书（JavaScript高级程序设计）的时候已经有点困惑了，怎么搞出来这两个这么相似的东西，重点是很多时候它们得到的结果都是一样的，虽然之后不了了之觉得对应用没什么大影响就不管了，直到现在开始写博客的时候才回头看看这个问题。

        好了，开始正文了。

        toString() 和 valueOf() 是对象的两个方法，你在浏览器后台输入Object.protototype就可以看到了它们是其中的两个。

        先说一下两个东西的用途：

        toString( ):返回对象的字符串表示。

        valueOf( ):返回对象的字符串、数值或布尔值表示。

        好了，写几个例子就明白返回结果了（undefined  和 null  的值就不举例了，因为它们都没有这两个方法，所以肯定会报错的）：
```
//先看看toString()方法的结果
var a = 3;
var b = '3';
var c = true;
var d = {test:'123',example:123}
var e = function(){console.log('example');}
var f = ['test','example'];

a.toString();// "3"
b.toString();// "3"
c.toString();// "true"
d.toString();// "[object Object]"
e.toString();// "function (){console.log('example');}"
f.toString();// "test,example"
```
```
//再看看valueOf()方法的结果
var a = 3;
var b = '3';
var c = true;
var d = {test:'123',example:123}
var e = function(){console.log('example');}
var f = ['test','example'];

a.valueOf();// 3
b.valueOf();// "3"
c.valueOf();// true
d.valueOf();// {test:'123',example:123}
e.valueOf();// function(){console.log('example');}
f.valueOf();// ['test','example']
```
        很清楚了，toString( )就是将其他东西用字符串表示，比较特殊的地方就是，表示对象的时候，变成"[object Object]",表示数组的时候，就变成数组内容以逗号连接的字符串，相当于Array.join(',')。 而valueOf( )就返回它自身了。

        至于迷惑的地方，就在于它们在什么时候被调用，举个例子：
```
var a = '3';
console.log(+a);// 3
```
        当然了，打印结果是数字3（不是字符串‘3’），因为一元加操作符接在字符串前面就将其转换为数字了（字符串转化为数字的一种方式，相当于Number( )方法），但是如果它应用在对象上，过程是怎样的呢，再举例子：
```
//例子一
var example = {test:'123'};
console.log(+example);// NaN

//例子二 同时改写 toString 和 valueOf 方法
var example = {
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
console.log(+example);// 32

//例子三 只改写 toString 方法
var example = {
    toString:function(){
        return '23';
    }
};
console.log(+example);// 23
```
        通过例子一和例子二的比较，我们可以知道，一元加操作符在操作对象的时候，会先调用对象的valueOf方法来转换，最后再用Number( )方法转换，而通过例子二和例子三的比较，我们可以知道，如果只改写了toString方法，对象则会调用toString方法，证明valueOf的优先级比toString高。

        好了，如果是alert呢？
```
//例子一
var example = {test:'123'};
alert(example);// "[object Object]"

//例子二 同时改写 toString 和 valueOf 方法
var example = {
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
alert(example);// "23"

//例子三 只改写 valueOf 方法
var example = {
    valueOf:function(){
        return '32';
    }
};
alert(example);// "[object Object]"
```
        虽然上面结果我用双引号了，但是你知道弹窗不会将字符串的双引号表示出来的。通过上面几个例子，我们就知道了，alert它对待对象，就和字符串和对象相加一样，就是调用它的toString( )方法，和valueOf方法无关。

        好了，总结一下，一般用操作符单独对对象进行转换的时候，如果对象存在valueOf或toString改写的话，就先调用改写的方法，valueOf更高级，如果没有被改写，则直接调用对象原型的valueOf方法。如果是弹窗的话，直接调用toString方法。至于其他情况，待续……
