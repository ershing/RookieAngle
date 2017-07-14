# 关于javascript中的操作符
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/javascriptoperator/ "点击我")

        javascript的操作符（或者叫运算符）有很多个，关于它们具体的介绍和优先级排序可以参考[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)。

        这篇文章更像是一篇笔记，记录一些操作符的操作效果。

        好了，用一道题开始这篇文章：
```javascript
console.log([] == ![]);
```
        这道题很经典，打印结果是什么？是true，这就有违我们平常的思维逻辑了，它本身和它取反的值还能相等的呢？好了，开始分析一下：

        逻辑操作符比比较操作符优先级高，首先会进行！[ ]这个操作，这个取反的逻辑非操作符有个规则，对象取反都是返回false，所以实则这条题目是：
```javascript
console.log([] == false);
```
        好了，到了比较操作符了，比较操作符又有个规则，如果比较的其中一个是对象，则要先调用它的valueOf( )方法或toString( )方法进行转换，之后再比较，关于valueOf( )和toString( )这两种方法，可以看前面的文章（关于javascript中的toString( )和valueOf( )），由于数组继承Array.prototype ，Array.prototype有toString方法，但是没有valueOf方法，而valueOf方法需要再上一级找Object.prototype才有，所以即使valueOf优先级高也不会调用，在这里就会调用toString方法，而空数组调用这个方法得到空字符串，所以又变成这样：
```javascript
console.log('' == false);
```
        到这里了，比较操作符又有规则了，布尔值在比较前会先转换为数值，而字符串和一个数值比较，则会转换字符串为数值再比较（比较拗口），所以又变成这样：
```javascript
console.log(0 == 0);
```
        答案显而易见，就是ture。

        好了，其实结合我前面的文章（关于javascript中的toString( )和valueOf( )）来看，其实也不难，在这里又再列举下其他一些规则吧：

        数值和字符串相加，会将数字转换为字符串再拼一起，例如：
```javascript
console.log(5+'5'); // '55'
```
        数值和字符串相减，会将字符串转换为数值再进行相减运算，例如：
```javascript
console.log(5-'5'); // 0
```
        比较操作符时候，字符串和数字比较，会转换字符串为数字再比较，例如：
```javascript
console.log(3>'5'); // false
```
        在这里总结上面：

        **相加减操作时候，有字符串可以拼肯定将数字转为字符串来拼，拼不到了（减法怎么拼）就将字符串转为数字去运算。**

        **比较操作时候，有数字比较，你肯定要转换为数值去比较啊。（至于两个字符串比较，就是按照字符编码去比较，实则比较的也是数值）。**

        至于其他情况，待续……
 
