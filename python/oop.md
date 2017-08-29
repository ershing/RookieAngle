# python中的面向对象编程
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/python-oop/ "点击我")

        面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是编程的一种思想，需要用来“类”、“对象”等来实现，其实javascript也可以用面向对象编程，但是它的类是伪类，都是自己封装出来的语法糖，所以这里就说一下python中是如何实现面向对象编程的。

        面向对象有三大特性：**封装、继承、多态**。

        不想一一举例解释得太详细，因为这些都很基本，简单来说，其实封装就是将某些可能重复使用的代码封装起来，通过不同的场景进行调用；继承就是子类可以继承父类的方法，和儿子继承父亲的特征差不多意思；多态就是无需明确引用的对象是什么，只需要根据不同的对象表现出不同的行为方式，python实现多态和强类型语言有点不同，强类型语言需要指定参数类型，而python不需要，它的对象推断风格为“鸭子类型”，也就是“当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子”。

        好了，直接来写一个类，一个子类，和一个实例化的对象：
```python
# 创建一个Person类
class Person(object):
    def __init__(self, name):
        self.name = name

    def who(self):
        print('I am %s' % self.name)

# 创建一个Father类继承Person类
class Father(Person):
    def __init__(self,name,age):
        super(Father,self).__init__(name)
        self.age = age
    
    def who(self):
        print('I am %s, I am %s years old.' % (self.name,self.age))

    def saying(self):
        print('I am Father')

father = Father('Jack',30)
father.who()   #I am Jack, I am 30 years old.
father.saying()   #I am Father
```
        其实很简单，每个类中都有一个__init__函数用来初始化对象，而所有定义的函数中的self就是用来传入实例化的对象，这个很类似javascript中构造函数的this，其实都大同小异，子类可以继承父类的所有方法，也可以改写父类的方法（who），更可以创建自己的方法（saying）。

        好了，该说说类的成员了，类的成员分为三大类：**字段、方法和属性**。

        **一、字段**

        字段包括普通字段和静态字段。举个例子：
```python
# 创建一个Person类
class Person(object):
    action = 'moving'
    def __init__(self,name):
        self.name = name

print(Person.action)   #'moving'
person = Person('Rose')
print(person.name)   #'Rose'
```
        可以看见，普通字段需要用类来访问，而静态字段要用对象来访问，这也很容易明白，一个函数里面的一个变量，当然通过这个函数来访问，而需要实例化时才传入的变量，当然是通过这个实例化的对象访问。

        **二、方法**

        方法包括普通方法、静态方法、类方法。举个例子：
```python
# 创建一个Person类
class Person(object):
    action = 'moving'

    def __init__(self,name):
        self.name = name

    def who(self):
        print('I am %s' % self.name)

    @classmethod
    def own(cls):
        print('I am class method and','I am %s' % cls.action)

    @staticmethod
    def static():
        print('I am static method')

person = Person('Kate')
person.who()   #I am Kate
Person.own()   #I am class method and I am moving
Person.static()   #I am static method
```
        也很容易理解，普通方法就是通过实例化的对象访问的，而类方法和静态方法都是通过类访问，但是类方法要传入自身这个类作为参数。

        **三、属性**

        属性就只有普通属性一个了，但是却是非常简单的，和普通方法差不多，举个例子：
```python
# 创建一个Person类
class Person(object):
    action = 'moving'

    def __init__(self,name):
        self.name = name

    def who(self):
        print('I am %s' % self.name)

    @property
    def run(self):
        print('I can run')


person = Person('Tom')
person.run   #I can run
```
        其实和普通方法没太大区别，定义时候加了个@property装饰器，只传入一个self，然后调用时候不用括号。

        不过要说一下属性的调用定义方式。

        类可分为经典类和新式类，而两者的区别就是是否继承自object，例如上面的Person就是新式类，前面的Father就是经典类，经典类定义属性只要前面加@property装饰器一种方法，而新式类，除了这种，还有两种：
```python
# 创建一个Person类
class Person(object):
    action = 'moving'

    def __init__(self, name):
        self.name = name
        self.my_age = 18

    def who(self):
        print('I am %s' % self.name)

    @property
    def age(self):
        print('I am %d years old' % self.my_age)
        return self.my_age

    @age.setter
    def age(self, years):
        self.my_age = years

    @age.deleter
    def age(self):
        del self.my_age
        print('I delete my age now')


person = Person('Jason')
person.age   #I am 18 years old
person.age = 20   #修改年龄为20
person.age   #I am 20 years old
del person.age   #删除了普通字段my_age
person.age   #删除后获取字段值会报错
person.age = 26   #重新设置年龄my_age为26
person.age   #I am 26 years old
```
        其实很简单，一种访问、一种修改、一种删除。

        其实每一个类成员可分两种形式：公有成员（哪里都能访问）、私有成员（类内部才能访问，外面通过类访问也不行），除了特殊成员（下面讲到）外，在命名时候在前面加两个下划线（例如__what）就变为私有成员了。

        好了，该说一下特殊成员了，也就是特定的一些成员，有：

        __doc__：类的描述信息。

        __module__：当前操作的对象在哪个模块

        __class__：当前操作的对象的类是什么

        __init__：构造方法，通过类创建对象时，自动执行

        __del__：析构方法，对象在内存中被释放时，自动执行

        __call__：实例化后的对象后面加括号，自动执行。

        __dict__：类或对象中的所有成员

        __str__：打印对象输出该方法的返回值

        __getitem__、__setitem__、__delitem__：用于索引操作，分别表示获取、设置、删除数据

        __getslice__、__setslice__、__delslice__：三个分片操作

        __iter__：迭代器

        __new__ 和 __metaclass__：用来表示该类由谁来实例化创建

        关于python的面向对象编程，大概如此。

 
