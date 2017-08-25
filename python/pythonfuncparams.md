# python中函数的参数类型
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/pythonfuncparams/ "点击我")

        学习python的过程中，少不了对函数的学习，而python中函数的参数又跟它自身数据类型有很大关系，所以有其自身的独特性，但是毕竟都是编程语言，跟其他语言都有相通的地方，这里就列举一下它的各种参数类型：

        **一、位置参数**

        就是一个萝卜一个坑，是你自己的就占自己的坑，例如：
```python
def devided(x, y):
    return x / y

print(devided(0, 3))   # 0.0
print(devided(3, 0))   # 报错
```
        这个位置是x的，你传参数进去，它就对应放在x那里，是y的就会放在y的那里，这就是位置参数。但要注意这个位置参数是必填参数，调用必须传递的。

        **二、默认参数**

        就是你不传递，它就默认一个参数，这个也很好理解，例如：
```python
def devided(x, y=1):
    return x / y

print(devided(3))   # 3.0
```
        就是我前面还是按位置参数传递，而到了有默认参数的地方，如果我不传递的话，那它就会按照函数定义的默认值来传值。

        但是这里要注意的是，默认参数必须放在位置参数之后，例如上面函数定义时候不能写devided(x=1, y)，就是必传的参数必须放在前面，爱传不传的参数（默认参数）必须放后面，你想一下自己调用函数时候就知道了。

        **三、不定长参数**

        如果我们传递进去的参数不确定传多少个怎么办，那就需要不定长参数了，例如：
```python
def calc(*numbers):
    sum = 0
    for i in numbers:
        sum += i
    return sum

print(calc(1,3,8))   # 12
```
        看函数里面的操作，可以知道numbers是一个可迭代对象，实则上就是一个tuple，当然了，你也可以不用到它的所有值，反正就是在不定长参数前面加一个 * 符号就行了。

        这个不定长参数，就和javascript中的函数参数有些区别了，javascript中的函数参数本来就是不定长的，你想传多少都没有问题，因为里面有一个arguments对象保存你传进来的值，所以上面这个例子，用javascript来写可以写成这样：
```javascript
function numbers() {
    var sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(numbers(1, 3, 8));   // 12
```
        所以有时候也挺喜欢用javascript这样打补丁的方式添加函数功能，只要判断后面某个参数在不在就行了。

        扯远了，回过头来，我们在传入不定长参数的时候一个一个传挺麻烦的啊，所以也可以在调用的时候传入一个list或者tuple，在前面加个 * 符号就行了，例如：
```python
def calc(*numbers):
    sum = 0
    for i in numbers:
        sum += i
    return sum

inputList = [1,3,8];
print(calc(*inputList))   # 12
```
        这样多方便，像javascript中的 ... 解构符号。

        **四、关键字参数**

        其实前面写到，js默认就是可变长参数，所以可以轻易扩展函数功能，但是python怎样做的呢，它是通过传入不确定的键值对来达到的，所以这个关键字参数也很好理解，就是key-value这样形式的参数。

        这种key-value在python中就是dict（字典），其实写法类似前面的不定长参数，不过多了一个 * 符号，例如：
```python
def introduction(name, age, **others):
    print('name is:', name)
    print('age is:', age)
    print('others is:', others)

introduction('Jade', 15, sex='female', height='170cm')
# 打印结果为：
# name is: Jade
# age is: 15
# others is: {'sex': 'female', 'height': '170cm'}
```
        所以也很清楚了，类似上面的不定长参数传参，我们也可以直接传一个dict，像这样：
```python
def introduction(name, age, **others):
    print('name is:', name)
    print('age is:', age)
    print('others is:', others)

details = {'sex':'female', 'height':'170cm'}
introduction('Jade', 15, **details)
# 打印结果为：
# name is: Jade
# age is: 15
# others is: {'sex': 'female', 'height': '170cm'}
```
        和前面都很类似对吧，但是这里打印的数据中的键值其实没有排序的，所以可能每次打印的顺序都不同，但是键值对还是那样的键值对。

        **五、命名关键字参数**

        其实我觉得这个名称和作用都很坑爹，因为关键字参数是不限制传入的关键字的，所以如果你要限制怎么办，那就要用命名关键字参数了，它是用一个 * 来分隔的，例如：
```python
def introduction(name, age, *, sex, height):
    print('name is %s, age is %s, sex is %s and heighe is %s' %
          (name, age, sex, height))

details = {'sex': 'female', 'height': '170cm'}
introduction('Jade', 15, **details)
# 打印结果为：
# name is Jade, age is 15, sex is female and heighe is 170cm

# 如果数据多了其他键值对
details = {'sex': 'female', 'height': '170cm', 'weight': '50kg'}
introduction('Jade', 15, **details)   # 报错
```
        所以可以看到，这个中间的 * 符号就是限制了关键字参数的关键字，所以叫做命名关键字参数（很绕口），那如果中间又有一个可变成参数呢？例如：
```python
def introduction(name, age, *args, sex, height):
    print(name, age, args, sex, height)
```
        由于可变长参数已经有个 * 符号了，所以后面就无需用 * 符号隔开了。

        好了，这就是python函数中的几种参数类型了，但是要注意的是，参数定义时候要按照这样的顺序：位置参数（必选参数）、默认参数、不定长参数、命名关键字参数和关键字参数。

        由于*args代表不定长参数，而**others代表关键字参数，所以我们可以用通式参数代表所有函数：

        所以可以看到，这个中间的 * 符号就是限制了关键字参数的关键字，所以叫做命名关键字参数（很绕口），那如果中间又有一个可变成参数呢？例如：
```python
def func(*args, **others):
    print(args, others)
```
