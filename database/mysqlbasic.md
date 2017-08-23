# MySQL基本语法
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/mysqlbasic/ "点击我")

        MySQL作为最流行的关系型数据库之一，当然有它自身的代表性，语句简练清晰，当然了，我们写编程很多实际用到的都是orm工具，例如node中的sequelize，都对数据库做了很好的封装，屏蔽了对数据库的直接语句操作，不过，原生操作语句还是要掌握好的。

        特别一些语句多起来的时候，特别要注重优化问题，看过一下数据库工程师抽丝剥茧，将一大串语句优化到操作时间减少大半时间的。

        其实关系型数据库的SQL语句都是大同小异的，这里就用MySQL的语句作为举例。这里只是单纯说一说一些基础的基本语法，不会全部遍及，当作笔记也可。

        MySQL存储的数据类型基本分为数字、字符串、时间等三类，MySQL5.7开始也支持JSON格式的存储，这方面不详说。

        数字又分为整形、浮点型，其中又分为不同长度的数据TINYINT、SMALLINT、FLOAT、DOUBLE等等，字符串定长、变长的字符串、长短文本及其二进制数据，CHAR、VARCHAR、TEXT等都是常见的类型，而时间基本分为时间值和时间戳，时间值就是一个点，而时间戳（TIMESTAMP）就是1970-01-01 00:00:00起到现在的总秒数，如果是32位操作系统的计算机，能表示的最大值为2147483647，68年，所以到了2038年这个操作系统的计算机会发生数据溢出，时间回去到1901年。

        其实对于学强类型语言的来说，例如JAVA、C++等的，对于这些数据类型来说，都不会陌生，耳熟能详的东西。

        创建表格就不多说了，一个例子很明白套路：
```sql
CREATE TABLE IF NOT EXISTS `ershing`(
   `ershing_id` INT UNSIGNED AUTO_INCREMENT,
   `ershing_name` VARCHAR(20) NOT NULL,
   `ershing_introduction` VARCHAR(160) NOT NULL,
   `create_time` DATE,
   PRIMARY KEY ( `ershing_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
        其实就是表格名称、字段和字段类型要求及一些主键或非空等的配置而已。

        好了，其实重要的还是对数据库操作，而数据库操作，无非就是增、删、改、查这几个操作，但是不要小看这几个操作，如果是多条件多表格组合的语句，足以搞晕，废话少说，直接来语句。

增：
```sql
INSERT INTO ershing
(ershing_name, ershing_introduction, create_time)
VALUES
("MySQL", "基本语法", NOW());
```
        就是用关键字INSERT INTO来对某个表格的某个字段插入某个值。

删：
```sql
DELETE FROM ershing WHERE ershing_id=7;
```
        就是用关键字DELETE FROM来对某个表格的某个位置的数据进行删除。

改：
```sql
UPDATE ershing SET ershing_name='SQLite' WHERE ershing_id=2;
```
        就是用UPDATE SET关键字对某个表格的某个字段内容进行更新操作。

查：
```sql
SELECT 
ershing_name, ershing_introduction, create_time
FROM ershing
WHERE ershing_id=3;
```
        就是用关键字SELECT FROM来选择在某些表中某地方的某些需要的字段。

        上面这些就是最基本的一些操作，至于其他的一些常用语句语法还有：

        Like：结合%来模糊搜索关键字，例如：WHERE  ershing_name  LiKE  '%SQL%'

        IN:多个条件，例如：SELECT  *  FROM  ershing WHERE ershing_id  IN (3,1,5)

        UNION：多个结果集合，例如：SELECT …FROM  …UNION  SELECT …FROM…

        LIMIT：辅助分页，例如：SELECT * FROM   ershing  LIMIT 5,10

        ORDER BY：排序，例如：SELECT  *  FROM  ershing  ORDER  BY  'create_time'  DESC;

        GROUP BY：分组，例如SELECT ershing_name, COUNT(*) FROM ershing GROUP BY ershing_name;

        多表连接：INNER JOIN（两表交集）、LEFT JOIN（左表基础上加两表交集的右表其余字段）、RIGHT JOIN（右表基础上加左表交集的其余字段）

        上面这些，相信足以应付85%以上的数据库操作要求了，关键还是具体问题具体分析，用好SQL语句还是很有必要的。

 
