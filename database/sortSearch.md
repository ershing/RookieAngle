# 数据库中的分类搜索
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/sort-search/ "点击我")

        我们在学习数据库的过程中，可以很清楚地了解到，如果要搜索我们需要的数据，就要在WHERE之后添加我们的条件，当然，搜索可以用LIMIT要求获取某个范围的数据，也可以用ORDER  BY来对获取的数据进行排序输出，也可以用MAX(  )或者MIN(  )等函数获取其中的最值，但是如果要分类呢？要怎么写sql语句才能符合我们想获得的数据呢？

        下面举一个简单的例子：

        我这里有一个回复的表格，用来记录所有对某个主题的回复，我先创建这个表格：
```sql
CREATE TABLE IF NOT EXISTS reply(
        reply_id INT NOT NULL ,
        subject_id INT NOT NULL ,
        replyer_id INT NOT NULL ,
        reply_content VARCHAR(50) DEFAULT "" ,
        reply_time DATETIME NOT NULL ,
        PRIMARY KEY(reply_id)
      );
```
        这是一个比较简单的reply（回复）的表格，用来记录其他人对某个主题的回复记录，replt_id是主键，subject_id是回复的主题id，replyer_id是回复人的账号id，而reply_content就是回复的内容，reply_time是回复的时间。

        好了，大概了解了这个表是干什么的了。

        那么现在，如果我想做一件事，展示一下所有的回复内容，那么我应该如何做呢？如果单纯获取所有回复很简单，就一句话：
```sql
SELECT * FROM reply;
```
        但是，我想获取某个主题（假设这个主题id为888）的所有回复内容呢？也是一句话：
```sql
SELECT * FROM reply WHERE reply.subject_id=888;
```
        这也只是在后面加个WHERE条件而已，那如果我需要获取某个主题（假设这个主题id为888）的最后回复时间呢？可以这样写：
```sql
SELECT MAX(reply_time), reply_id FROM reply 
WHERE reply.subject_id=888;
```
        可以用最大值代表最后的回复时间。那又如果我想获取好几个主题（假设这几个主题id为111，333，888）的最后回复时间呢？

        可能瞬间你会想到用IN，这样：
```sql
SELECT MAX(reply_time), reply_id FROM reply 
WHERE reply.subject_id IN (111，333，888);
```
        但是很显然，这是错的，因为你只是在三个主题（111,333,888）下的所有情况搜索出最后的回复时间，而没有每一条主题的回复时间，所以结果最多只有一条。

        当然了，你可以用UNION方法达到效果：
```sql
SELECT MAX(reply_time), reply_id FROM reply 
WHERE reply.subject_id=111
UNION
SELECT MAX(reply_time), reply_id FROM reply 
WHERE reply.subject_id=333
UNION
SELECT MAX(reply_time), reply_id FROM reply 
WHERE reply.subject_id=888;
```
        但是我只给你一个数组呢，要你用IN方法写出来呢？

        那就要从最根本查找语句的逻辑出发了，因为我们是查找某些主题下的最后回复时间，那么我们从整个表中查找的话，那就只需要给我所有的最后回复时间啊，我先不管最后回复时间是怎样来的，我也可以先写出这样的语句：
```sql
SELECT reply_time, reply_id FROM reply 
WHERE ……;
```
        好了，这个时候我们就要考虑怎样获取到所有的主题，这里就要借用一个技巧，借用一下别名，因为我们需要找出所有的主题，那么如何找，那就需要用两个表来确认subject_id相等的地方，那就可以找出所有同一主题的数据，再从中提取最大值，那就可以了：
```sql
SELECT reply_time, reply_id FROM reply AS a
WHERE 
(SELECT MAX(b.reply_time) FROM reply AS b 
WHERE
a.subject_id=b.subject
);
```
        最后，再加上需要查找的subject_id就可以了：
```sql
SELECT reply_time, reply_id FROM reply AS a
WHERE 
(SELECT MAX(b.reply_time) FROM reply AS b 
WHERE
a.subject_id=b.subject AND b.subject IN (111,333,888)
);
```
        上面就是一个简单的分类搜索语句，但是实际应用中，有很多远远复杂的要求，所以对sql语句的掌握也是非常重要的。

 
