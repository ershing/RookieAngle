# python中的文献检索之关键词检索
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/search-by-keyword/ "点击我")

        其实什么文献检索之关键词检索，也就是一道题目，最近在一个论坛上看到的题目，然后就做出来了，但是这道题目对掌握python的基础还是很有帮助的。

        先来说一下这道题目是怎样的，详细如下：

        使用过文献检索系统的同学都知道，在文献检索中我们可以使用关键词进行检索，而且关键词与关键词之间可以用“与”、“或”、“非”的逻辑关系进行组合，并且可以用括号改变“与或非”的优先级顺序。

        通常，我们用“&”表示“与”，其表示的含义为两个关键词同时出现在检索的文本中；用“|”表示“或”，其表示的含义为两个关键词有任一个出现在检索的文本中；用“！”表示“非”，其表示的含义为“！”后紧跟的一个关键词不出现在检索的文本中。它们三者默认的优先级顺序为“！”>“&”> “|”，我们可以用括号改变它们之间的优先级顺序。关键词与“&|！”之间用空格隔开，“！”之后的关键词可以省略空格。

        例如，被检索的文本txt = 'one apple with two leaves, one is green and the other is yellow.'
我们用s1 = '(apple | others) & two' 进行搜索，返回的结果应该为 True
我们用s4 = '!green & (ones | two)' 进行搜索，返回的结果应该为 False

        现在，请你设计一个函数，给定一个关键词字符串string，在txt中搜索是否能匹配，返回True或者False。

        测试例子为：
```python
#Test sample
txt = 'one apple with two leaves, one is green and the other is yellow.'
s1 = '(apple | others) & two' #True
s2 = 'one & yellow & leaf' #False
s3 = '(!three | one & four) & !five' #True
s4 = '!green & (ones | two)' #False
s5 = '(big | !apple | the) & ((!yellow | !green) | others)' #False
```
        好了，理解完上面的题目，就开始我们的解题流程了：

        我的思路大概是这样的，用类python缩进写一下伪代码表示为：
```python
find the inner brackets：
while txt match: 
    if txt has !:
        test txt
        replace txt
    if txt has &:
        test txt
        replace txt
    if txt has |:
        test txt   
        replace txt
if txt has !:
     test txt
     replace txt
if txt has &:
    test txt
    replace txt
if txt has |:
    test txt 
    replace txt
return txt
```
        虽然写得很烂的伪代码，但是总体思想基本表现出来，大概就是：

        先找出最里面的方括号，然后就拿出方括号的内容来进行测试，找出里面的每一个单词，检测字符串中是否包含此单词，如果有！符号，则检测是否不包含此单词，然后将检测结果分别替换为True和False，然后从左向右开始查找是否有&符号，如果有则判断相邻的两个单词（True或False）的结果继续替换True或False，然后继续判断是否有|符号，类似前面那样继续替换为True或False，最后替换到没有括号了，剩下的语句也就像你找到最里面括号的内容那样继续来一遍，最后就可以返回相应答案了。

        说的很长很罗嗦，其实代码可以进一步优化，因为我看到代码重复第二次的时候，我就会认真考虑是否要进行封装了，不过这里就顺着思维直接走一遍，写出了意大利面条式的代码。

        详细的完整写代码思路就不细说了，不过这里主要用到两种方法：

        1.正则搜索：
```python
testInner = re.findall('\([^\(.*^\)]*\)', string)   #搜索最里括号
toList = re.findall('!?\w+', each)   #搜索纯单词
matchAnd = re.findall('\w+\s\&\s\w+',testInner[ind])   #搜索&符号
matchOr = re.findall('\w+\s\|\s\w+',newString)   #搜索|符号
```
        2.正则匹配替换：
```python
# 定义替换方式
def change(matched):
    toRe = toList[0]   #替换列表的第一个元素
    toList.pop(0)      #去掉列表的第一个元素
    return toRe        #返回数据
testInner[ind] = re.sub('!?\w+', change, each)
```
        其实正则搜索很容易理解，但是正则匹配这里，我自己用了一个方法，因为我想用自己的一个列表中的每一个元素对应替换正则匹配到的每一个元素，又暂时找不到什么简便的函数，所以就自己想了这个办法，每个传进来的匹配内容，就匹配我的列表的第一个元素，然后我将第一个元素去掉，然后第二个传进来的匹配内容，继续匹配第一个元素，但是实际上是原列表的第二个元素了，所以以此类推，进行了整个列表的替换。

        其实这里面直接替换为True和False其实是一个bug，因为如果测试的语句如果有True或False就会出问题了，可以替换为两个uuid，最后返回才输出布尔值。

        废话少说，直接贴一下最原始最粗糙的整个代码：[代码文件]()

