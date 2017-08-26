# 关于javascript中的作用域和作用域链
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/javascript-scope-chain/ "点击我")

        前面的文章说到， 执行上下文的创建阶段，主要有三个内容：

        1、创建变量对象；2、初始化作用域链；3、确定this的指向。

        在这里，要说一下作用域和作用域链了，先来一个例子：
```javascript
//全局环境
var a = 10;
function inner(){
    console.log(a);
}
inner();
```
        在inner函数的执行上下文的执行阶段中，它的VO（变量对象）都没有var a这样的变量声明，所以console的时候，怎样获得a的值呢，就是通过全局环境中的AO（活动对象），因为里面就有a的值（不知道什么是VO和AO，一定要先看一下我前面的文章：[关于javascript中的变量对象和活动对象](https://github.com/ershing/RookieAngle/blob/master/javascript/javascriptvariableobject.md "关于javascript中的变量对象和活动对象")）。

        其实，作用域这个东西，可以理解为自身执行上下文中的活动对象（AO）可以被访问的区域，说的有点拗口，其实看一下我前面的文章（[关于javascript中的变量对象和活动对象](https://github.com/ershing/RookieAngle/blob/master/javascript/javascriptvariableobject.md "关于javascript中的变量对象和活动对象")），就可以知道，其实我们执行函数的时候，用到的变量值，都是从AO上面取到的，如果自己的执行上下文中的AO没有对应要用的值（例如上面例子中的a），那就要往上一层的执行上下文中的AO中找这个值，如果上一层还没有，就要再往上一层的执行上下文中的AO去找，而这个一层一层的链接关系，就是所谓的作用域链。（这里说到的上一层，其实就是执行上下文栈中压着的下一层执行上下文，不理解可以先看我前面的文章：[关于javascript中的从堆栈内存到执行上下文](https://github.com/ershing/RookieAngle/blob/master/javascript/executioncontext.md "关于javascript中的从堆栈内存到执行上下文")）

        说到作用域这个东西，我觉得不少人都被它坑过，举个例子：
```javascript
//先声明变量jj并赋值为10
var jj = 10;

//再声明一个函数what
function what(){
    console.log(jj);
}

//执行what函数
what();
```
        相信大家都非常清楚打印结果了，就和上面例子一样，就是10。那如果这样呢：
```javascript
//先声明变量jj并赋值为10
var jj = 10;

//再声明一个函数what
function what(){
    console.log(jj);
    var jj = 20;
    console.log(jj);
}

//执行what函数
what();
```
        是不是会说打印结果是10和20呢？那就错了，实际打印结果是undefined和20。为什么呢？不是一开始打印时候前面没有变量jj，然后向上找到等于10，后面就改变它的值，然后输入20吗？

        这样就没有真正理解javascript的词法作用域的概念。作用域的类别可以影响到变量的取值，分为词法作用域（静态作用域）和动态作用域。

        它们的区别是：对于词法作用域，函数的作用域在函数定义的时候就已经确定了，而动态作用域不同，在函数调用的时候才确定的。

        而javascript，采用的就是词法作用域，或者叫静态作用域。

        所以在what函数中声明了一个var jj = 20，就将里面有jj这个变量名的取值，框住了在这个函数里面了，或者可以说，调用what函数的时候，你用var这样的字眼声明了jj这个变量，就会在执行上下文创建时候的变量对象VO中挂上了属性jj=undefined，所以一开始就将jj打印出来，由于还没有赋值，所以打印出undefined了，然后后面赋值了，就打印出了20了。

        如果你想按照你一开始想的那样打印出10和20，可以将what函数里面的var jj = 20改为jj = 20，去掉var，这样就相当于what函数里面没有声明变量jj，而是向上找到jj，并将它打印，然后更改jj的值，再打印，实际上，这种做法会污染全局变量，因为你在what函数里面将jj这个全局变量的值改为20了。

        好了，如果你明白因为用var声明了变量，导致在自身的执行上下文中寻找jj的值而不是向上寻找，但是你不明白为什么var jj 明明在console之后才声明的，为什么会受到它影响呢？这里，就要再说一个概念，叫做变量提升。

        变量提升，就是解释器会将函数声明和变量声明提升到方法体的最顶部，函数声明比变量声明提得更高。

        其实很容易理解变量提升，还是回去看一下我前面的文章（[关于javascript中的变量对象和活动对象](https://github.com/ershing/RookieAngle/blob/master/javascript/javascriptvariableobject.md "关于javascript中的变量对象和活动对象")）就知道了，执行上下文在创建的时候就会创建变量对象，而变量对象的创建顺序为：形参、函数声明、变量声明（用var 声明的），所以在你的代码执行阶段（执行上下文的执行阶段）之前，它已经创建了变量对象了，所以相对其他的执行代码来说，这就是所谓的变量提升。

        说回去最初的执行what函数的地方，其实我这样写也是可以的：
```javascript
//先声明变量jj并赋值为10
var jj = 10;

//执行what函数
what();

//现在才声明一个函数what
function what(){
    console.log(jj);
}
```
        为什么呢？因为变量提升，解释器会将声明的what这个函数提到顶部，所以你上面执行what这个函数，实际解释器已经将what函数提升上去了。

        除了函数声明，变量声明也一样。

        回到前面的例子，我在what函数内声明并初始化var jj = 20 可以看成两个步骤，第一个步骤，声明变量var jj ，第二个步骤，初始化变量，jj = 20，所以上面的函数可以写成这样：
```javascript
function what(){
    console.log(jj);
    var jj ;
    jj = 20;
    console.log(jj);
}
```
        当然了，这里面声明的jj变量，也会变量提升，所以会变成这样：
```javascript
function what(){
    var jj ;
    console.log(jj);
    jj = 20;
    console.log(jj);
}
```
        再结合回到前面一起：
```javascript
//先声明变量jj并赋值为10
var jj = 10;

//再声明一个函数what
function what(){
    var jj ;
    console.log(jj);
    jj = 20;
    console.log(jj);
}

//执行what函数
what();
```
        是不是很好地理解了打印结果就是undefined 和 20了，这里要注意的是，初始化变量是不会提升的，所以jj = 20还是留在了原位。

        换个方式说一下变量提升，下面两个函数写法有什么不同的地方：
```javascript
//写法一
var claim = function(){
    console.log('i am first');
};

//写法二
function claim(){
    console.log('i am first');
}
```
        举一个例子就很清楚了：
```javascript
//写法一
var claim = function(){
    console.log('i am first');
};

claim();//打印结果为i am first

var claim = function(){
    console.log('i am second');
};

claim();//打印结果为i am second
```
```javascript
//写法二
function claim (){
    console.log('i am first');
};

claim();//打印结果为i am second

function claim(){
    console.log('i am second');
};

claim();//打印结果为i am second
```
        好了，理解了上面两种打印结果就知道了变量提升了。

        其实作用域前面已经说得很清楚了，就是执行上下文的AO（活动对象）可被访问的范围，而作用域链可以类比原型链，自己如果没有，就一级一级往上找，这个一级一级，就是执行上下文栈中压着的下一个执行上下文（再回顾前面文章：[关于javascript中的从堆栈内存到执行上下文](https://github.com/ershing/RookieAngle/blob/master/javascript/executioncontext.md "关于javascript中的从堆栈内存到执行上下文")），那就很容易理解明白了。
