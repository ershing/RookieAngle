# 关于javascript中的原型和原型链
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/javascriptprototype/ "点击我")

        关于javascript中的原型和原型链，可能都会想到一个词“prototype”，而实际里面藏的是什么东西，才是大家应该要掌握的。

        看过一些文章，将原型和原型链说得很枯燥难懂，其实抽丝剥茧之后，理顺思路，其实原型和原型链没有想象中的那么难以理解。我一直崇尚的是类比生活去理解，所以个人还是不太喜欢纯叙述性的解释。

        其实很多讲解的人，都是从自身角度出发的，解释的都是理所当然的，他们无法感受我们这些菜鸟的角度，不知道我们很多个为什么。当然，当我们了解理解之后，再重新看他们的文章，说的也是头头是道的。

        关于原型这个词，其实很好理解，可以说成是“原来的模型”。比如说，“儿子长得就像是爸爸一个模子出来一样”，那爸爸就是儿子的原型，儿子继承了爸爸的一些特征，当然，儿子也会有自己的特征，这些特征，就是属性。而有时候儿子有些特征没有，可以在儿子的爸爸那里找到，甚至儿子爸爸那里找不到的特征，可以在爸爸的爸爸那里找到，而彼此之间维系着的，就是血缘关系，DNA传递，而这个关系链，就是我们说的原型链，当然，往上找祖先，找到最后肯定是炎帝黄帝了，他们就是人类始祖了，如果他们身上还找不到，再往上找，就是空了，因为往上就没有祖先了，本来无一物，何处惹尘埃。

        好了，开始来代码了。

        先来一个构造函数：
```javascript
//构造一个人类
function mankind(name){
    this.name = name;
}

//实例化一个Dad对象
var Dad = new mankind('BaBa');

//看看Dad的名字是什么
console.log(Dad.name);

//打印结果
BaBa
```
        先说一个前提:

        **只要是函数，就会有一个 prototype 属性，可以理解为子代的原型（遗传基因）；只要是对象，就会有一个__proto__方法，可以理解为向上寻找原型的方法。**

        所以上面的构造函数中，mankind这个构造函数，就会有一个prototype属性（不是函数没有），可以这样访问：mankind.prototype，当然也可以给传统基因添加其他特征：
```javascript
//还是上面的构造函数
function mankind(name){
    this.name = name;
}

//还是实例化一个Dad对象
var Dad = new mankind('BaBa');

//然后给构造函数添加特征
mankind.prototype.sayHello = 'HaHaHa';

//看看Dad有没有sayHello特征
console.log(Dad.sayHello);

//打印结果
HaHaHa
```
        从结果可以看出，Dad本来没有的sayHello特征，你给构造函数添加了，Dad也会拥有这个特征了，其实这就是从原型链上找到这个属性了。

        Dad对象这个实例的原型，就是mankind.prototype这个遗传基因。

        而向上找原型，就是通过__proto__这个方法，所以：
```javascript
Dad.__proto__ === mankind.prototype  //true
```
        当然，mankind.prototype也是一个对象，当然也有一个__proto__方法，通过这个方法，也是可以找到他再上一级的原型，所以：
```javascript
mankind.prototype.__proto__ === Object.prototype //true
```
        这也是对的。因为函数的祖先是Object，所以就是指向Object.prototype这个原型 。
        当然，再往上找，就是空了。
```javascript       
Object.prototype.__proto__  === null  //true 
```       
        所以各个原型组织起来，就是一条原型链了：

        Dad ---> mankind.prototype ---> Object.prototype ---> null<br>
 
        回过头来，其实mankind.prototype这个对象除了__proto__这个方法外，还有一个constructor的方法，因为mankind是构造函数，所以特有的这个方法，所以通过这个方法，可以访问到自身这个构造函数：
```javascript
//打印一下mankind.prototype.constructor
console.log(mankind.prototype.constructor);

//打印结果
function mankind(name){
    this.name = name;
}
```
        说到这里，相信已经类比得很清楚了。然后又会有一个疑问：

        既然说函数是对象(函数对象Function，普通对象Object，Function是继承于Object的)，那么前面的构造函数mankind可以有prototype属性，也应该有__proto__这个方法？

        没错，所以我们也可以有mankind.__proto__这个方法访问原型:
```javascript
mankind.__proto__ === Function.prototype  //true
```
        当然，Function.prototype 也是可以通过__proto__方法访问原型：
```javascript
Function.prototype.__proto__ === Object.prototype //true
```
        所以也有这样的原型链：

        mankind ---> Function.prototype ---> Object.prototype ---> null<br>

        当然了，我们既然有一个实例的对象Dad，当然也可以再延生下去，生一个Son来继承Dad的啦：
```javascript
//从Dad那里继承，创建一个son对象，下面两种方法都可以：
var Son = new Object(Dad);
var Son = Object.create(Dad);

//修改一下儿子的name
Son.name = 'ErZi';

//打印一下儿子的name和原型链上父亲的name
console.log(Son.name);
console.log(Son.__proto__.name);//通过__proto__方法找到父亲Dad

//打印结果
ErZi
BaBa
```
        所以这条原型链是这样的：

        Son ---> Dad ---> mankind.prototype ---> Object.prototype ---> null<br>

        通过上面的一大顿啰嗦，相信已经很清楚了，最后再说一下鸡和鸡蛋的问题：

        上面既然说到有Object.prototype，而且prototype是函数才有的，所以可以访问到Object这个构造函数，可以用Object.prototype.constructor这个方法，当然构造函数是继承于函数对象的，所以构造函数原型又是Function.prototype，所以也有这样的一条原型链：

        Object ---> Function.prototype ---> Object.prototype ---> null<br>

        或者表示为：

        Object.prototype.constructor---> Function.prototype ---> Object.prototype ---> null<br>

        这就是鸡和鸡蛋的问题了。

        最最后，放上一张网络上解释很清楚的原型链图，再结合我上面的啰嗦，相信就很清楚容易明白了。
        <div align=center><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1498028312&di=5dc545ec45d571ebaf82edc6bfd4adae&src=http://images2015.cnblogs.com/blog/952839/201608/952839-20160807171533231-172025675.png" alt="原型链图" /></div>



