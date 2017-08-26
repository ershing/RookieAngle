# 关于javascript中的bind、call、apply等函数的用法
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/javascript-bind-call-apply/ "点击我")

        前面的文章已经说到this的指向了，那么这篇文章就要说一说和this相关的三个函数的用法：bind( )、call( )和apply( )。

        其实它们都很简单，但是在处理一些与this相关的函数的时候，用来改变函数中this的指向，却是必不可少的工具，所以必须掌握好它们的用法。

        好了，三管齐下，一起比较地举例子说一下：
```javascript
//先来一个对象big吧
var big = {
    name:'BaBa',
    saying:function (age){
        console.log(this.name,'age:',age);
    }
};

//再来一个small对象
var small= {
    name:'ErZi'
};

//如果想调用big的saying方法来说出‘Erzi’:
//使用bind方法
big.saying.bind(small)(20);//打印结果为ErZi age: 20
//使用call方法
big.saying.call(small,20);//打印结果为ErZi age: 20
//使用apply方法
big.saying.apply(small,[20]);//打印结果为ErZi age: 20
```
        所以，其实三种方法都可以达到同一个结果，至于区别就很显而易见了。

        bind只是单纯创建了一个函数，并将this的指向明确指定为small了，如果要执行函数，就要在后面加括号调用了。

        call就是直接执行一个自己指定this指向的函数，参数是一个一个传递。

        apply和call的区别就是，参数是放进一个数组中传递。

        实际上，很多时候我们在一个函数中，想用到其他的函数，但是其他函数的this指向就不明确，所以就会在自己的函数里面通过这三个方法来调用函数，例如：
```javascript
//先来一个对象big吧
var big = {
    name:'BaBa',
    age:50,
    saying:function (){
        console.log(this.name,'age:',this.age);
    }
};

//再来一个SayingAge的构造函数
function SayingAge(name,age){
    this.name = name;
    this.age = age;
    this.saying = big.saying.bind(this);
}

//实例化一个对象genius
var genius = new SayingAge('tiancai',18);
//调用genius的saying方法
genius.saying();//打印结果为tiancai age: 18
```
        构造函数SayingAge就是将big的saying方法拿过来，并将saying函数里面的this指向改为自己的this指向（指向实例化的对象）。

        如果想不单单是bind了一个函数的this指向，还想执行它，举个call的例子（apply只是将参数放进数组）：
```javascript
//先来一个对象big吧
var big = {
    name:'BaBa',
    age:50,
    saying:function (sex){
        console.log(this.name,'age:',this.age,'sex:',sex);
    }
};
//再来一个small对象
var small = {
    name:'ErZi',
    age:18
};
//借用big的saying方法看看small的saying是什么
big.saying.call(small,'male');//打印结果为ErZi age: 18 sex: male
```
        当然了，这个方法并没有给small添加了saying方法，只不过调用了big的saying方法，并将里面的this指向small而已。

        相信大家对这三个方法的应用都很轻松掌握了。
