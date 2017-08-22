# Python的一些相关函数

## number相关的函数
|函数|返回值 ( 描述 )|
|:---|:---|
|[abs(x)](http://www.runoob.com/python3/python3-func-number-abs.html)|返回数字的绝对值，如abs(-10) 返回 10|
|[ceil(x) ](http://www.runoob.com/python3/python3-func-number-ceil.html)|返回数字的上入整数，如math.ceil(4.1) 返回 5|
|cmp(x, y)|如果 x &lt; y 返回 -1, 如果 x == y 返回 0, 如果 x &gt; y 返回 1。 Python 3 已废弃 。使用  使用 (x&gt;y)-(x&lt;y) 替换。 |
|[exp(x) ](http://www.runoob.com/python3/python3-func-number-exp.html)|返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045|
|[fabs(x)](http://www.runoob.com/python3/python3-func-number-fabs.html)|返回数字的绝对值，如math.fabs(-10) 返回10.0|
|[floor(x) ](http://www.runoob.com/python3/python3-func-number-floor.html)|返回数字的下舍整数，如math.floor(4.9)返回 4|
|[log(x) ](http://www.runoob.com/python3/python3-func-number-log.html)|如math.log(math.e)返回1.0,math.log(100,10)返回2.0|
|[log10(x) ](http://www.runoob.com/python3/python3-func-number-log10.html)|返回以10为基数的x的对数，如math.log10(100)返回 2.0|
|[max(x1, x2,...) ](http://www.runoob.com/python3/python3-func-number-max.html)|返回给定参数的最大值，参数可以为序列。|
|[min(x1, x2,...) ](http://www.runoob.com/python3/python3-func-number-min.html)|返回给定参数的最小值，参数可以为序列。|
|[modf(x) ](http://www.runoob.com/python3/python3-func-number-modf.html)|返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。|
|[pow(x, y)](http://www.runoob.com/python3/python3-func-number-pow.html)| x**y 运算后的值。|
|[round(x [,n])](http://www.runoob.com/python3/python3-func-number-round.html)|返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。|
|[sqrt(x) ](http://www.runoob.com/python3/python3-func-number-sqrt.html)|返回数字x的平方根，数字可以为负数，返回类型为实数，如math.sqrt(4)返回 2+0j|


|函数|描述|
|:---|:---|
|[choice(seq)](http://www.runoob.com/python3/python3-func-number-choice.html)|从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。|
|[randrange ([start,] stop [,step]) ](http://www.runoob.com/python3/python3-func-number-randrange.html)|从指定范围内，按指定基数递增的集合中获取一个随机数，基数缺省值为1|
|[random() ](http://www.runoob.com/python3/python3-func-number-random.html)| 随机生成下一个实数，它在[0,1)范围内。|
|[seed([x]) ](http://www.runoob.com/python3/python3-func-number-seed.html)|改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。|
|[shuffle(lst) ](http://www.runoob.com/python3/python3-func-number-shuffle.html)|将序列的所有元素随机排序|
|[uniform(x, y)](http://www.runoob.com/python3/python3-func-number-uniform.html)|随机生成下一个实数，它在[x,y]范围内。|


|函数|描述|
|:---|:---|
|[acos(x)](http://www.runoob.com/python3/python3-func-number-acos.html)|返回x的反余弦弧度值。|
|[asin(x)](http://www.runoob.com/python3/python3-func-number-asin.html)|返回x的反正弦弧度值。|
|[atan(x)](http://www.runoob.com/python3/python3-func-number-atan.html)|返回x的反正切弧度值。|
|[atan2(y, x)](http://www.runoob.com/python3/python3-func-number-atan2.html)|返回给定的 X 及 Y 坐标值的反正切值。|
|[cos(x)](http://www.runoob.com/python3/python3-func-number-cos.html)|返回x的弧度的余弦值。|
|[hypot(x, y)](http://www.runoob.com/python3/python3-func-number-hypot.html)|返回欧几里德范数 sqrt(x*x + y*y)。 |
|[sin(x)](http://www.runoob.com/python3/python3-func-number-sin.html)|返回的x弧度的正弦值。|
|[tan(x)](http://www.runoob.com/python3/python3-func-number-tan.html)|返回x弧度的正切值。|
|[degrees(x)](http://www.runoob.com/python3/python3-func-number-degrees.html)|将弧度转换为角度,如degrees(math.pi/2) ，  返回90.0|
|[radians(x)](http://www.runoob.com/python3/python3-func-number-radians.html)|将角度转换为弧度|


## string相关的函数
|序号|方法|描述|
|:---|:---|:---|
|1|[capitalize()](http://www.runoob.com/python3/python3-string-capitalize.html)|将字符串的第一个字符转换为大写|
|2|[center(width, fillchar)](http://www.runoob.com/python3/python3-string-center.html)|返回一个指定的宽度 width 居中的字符串，fillchar 为填充的字符，默认为空格。|
|3|[count(str, beg= 0,end=len(string))](http://www.runoob.com/python3/python3-string-count.html)|返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数|
|4|[bytes.decode(encoding=&quot;utf-8&quot;, errors=&quot;strict&quot;)](http://www.runoob.com/python3/python3-string-decode.html)|Python3 中没有 decode 方法，但我们可以使用 bytes 对象的 decode() 方法来解码给定的 bytes 对象，这个 bytes 对象可以由 str.encode() 来编码返回。|
|5|[encode(encoding='UTF-8',errors='strict')](http://www.runoob.com/python3/python3-string-encode.html)|以 encoding 指定的编码格式编码字符串，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace'|
|6|[endswith(suffix, beg=0, end=len(string))](http://www.runoob.com/python3/python3-string-endswith.html)|检查字符串是否以 obj 结束，如果beg 或者 end 指定则检查指定的范围内是否以 obj 结束，如果是，返回 True,否则返回 False.|
|7|[expandtabs(tabsize=8)](http://www.runoob.com/python3/python3-string-expandtabs.html)|把字符串 string 中的 tab 符号转为空格，tab 符号默认的空格数是 8 。|
|8|[find(str, beg=0 end=len(string))](http://www.runoob.com/python3/python3-string-find.html)|检测 str 是否包含在字符串中 中，如果 beg 和 end 指定范围，则检查是否包含在指定范围内，如果是返回开始的索引值，否则返回-1|
|9|[index(str, beg=0, end=len(string))](http://www.runoob.com/python3/python3-string-index.html)|跟find()方法一样，只不过如果str不在字符串中会报一个异常.|
|10|[isalnum()](http://www.runoob.com/python3/python3-string-isalnum.html)|如果字符串至少有一个字符并且所有字符都是字母或数字则返回 True,否则返回 False|
|11|[isalpha()](http://www.runoob.com/python3/python3-string-isalpha.html)|如果字符串至少有一个字符并且所有字符都是字母则返回 True,否则返回 False|
|12|[isdigit()](http://www.runoob.com/python3/python3-string-isdigit.html)|如果字符串只包含数字则返回 True 否则返回 False..|
|13|[islower()](http://www.runoob.com/python3/python3-string-islower.html)|如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True，否则返回 False|
|14|[isnumeric()](http://www.runoob.com/python3/python3-string-isnumeric.html)|如果字符串中只包含数字字符，则返回 True，否则返回 False|
|15|[isspace()](http://www.runoob.com/python3/python3-string-isspace.html)|如果字符串中只包含空白，则返回 True，否则返回 False.|
|16|[istitle()](http://www.runoob.com/python3/python3-string-istitle.html)|	如果字符串是标题化的(见 title())则返回 True，否则返回 False|
|17|[isupper()](http://www.runoob.com/python3/python3-string-isupper.html)|如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True，否则返回 False|
|18|[join(seq)](http://www.runoob.com/python3/python3-string-join.html)|以指定字符串作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串|
|19|[len(string)](http://www.runoob.com/python3/python3-string-len.html)|返回字符串长度|
|20|[ljust(width[, fillchar])](http://www.runoob.com/python3/python3-string-ljust.html)|返回一个原字符串左对齐,并使用 fillchar 填充至长度 width 的新字符串，fillchar 默认为空格。|
|21|[lower()](http://www.runoob.com/python3/python3-string-lower.html)|转换字符串中所有大写字符为小写.|
|22|[lstrip()](http://www.runoob.com/python3/python3-string-lstrip.html)|截掉字符串左边的空格或指定字符。|
|23|[maketrans()](http://www.runoob.com/python3/python3-string-maketrans.html)|创建字符映射的转换表，对于接受两个参数的最简单的调用方式，第一个参数是字符串，表示需要转换的字符，第二个参数也是字符串表示转换的目标。|
|24|[max(str)](http://www.runoob.com/python3/python3-string-max.html)|返回字符串 str 中最大的字母。|
|25|[min(str)](http://www.runoob.com/python3/python3-string-min.html)|返回字符串 str 中最小的字母。|
|26|[replace(old, new [, max])](http://www.runoob.com/python3/python3-string-replace.html)|把 将字符串中的 str1 替换成 str2,如果 max 指定，则替换不超过 max 次。|
|27|[rfind(str, beg=0,end=len(string))](http://www.runoob.com/python3/python3-string-rfind.html)|类似于 find()函数，不过是从右边开始查找.|
|28|[rindex( str, beg=0, end=len(string))](http://www.runoob.com/python3/python3-string-rindex.html)|类似于 index()，不过是从右边开始.|
|29|[rjust(width,[, fillchar])](http://www.runoob.com/python3/python3-string-rjust.html)|返回一个原字符串右对齐,并使用fillchar(默认空格）填充至长度 width 的新字符串|
|30|[rstrip()](http://www.runoob.com/python3/python3-string-rstrip.html)|删除字符串字符串末尾的空格.|
|31|[split(str=&quot;&quot;, num=string.count(str))](http://www.runoob.com/python3/python3-string-split.html)|num=string.count(str))以 str 为分隔符截取字符串，如果 num 有指定值，则仅截取 num 个子字符串|
|32|[splitlines([keepends])](http://www.runoob.com/python3/python3-string-splitlines.html)|按照行('\r', '\r\n', \n')分隔，返回一个包含各行作为元素的列表，如果参数 keepends 为 False，不包含换行符，如果为 True，则保留换行符。|
|33|[startswith(str, beg=0,end=len(string))](http://www.runoob.com/python3/python3-string-startswith.html)|检查字符串是否是以 obj 开头，是则返回 True，否则返回 False。如果beg 和 end 指定值，则在指定范围内检查。|
|34|[strip([chars])](http://www.runoob.com/python3/python3-string-strip.html)|在字符串上执行 lstrip()和 rstrip()|
|35|[swapcase()](http://www.runoob.com/python3/python3-string-swapcase.html)|将字符串中大写转换为小写，小写转换为大写|
|36|[title()](http://www.runoob.com/python3/python3-string-title.html)|返回&quot;标题化&quot;的字符串,就是说所有单词都是以大写开始，其余字母均为小写(见 istitle())|
|37|[translate(table, deletechars=&quot;&quot;)](http://www.runoob.com/python3/python3-string-translate.html)|根据 str 给出的表(包含 256 个字符)转换 string 的字符,要过滤掉的字符放到 deletechars 参数中|
|38|[upper()](http://www.runoob.com/python3/python3-string-upper.html)|	转换字符串中的小写字母为大写|
|39|[zfill (width)](http://www.runoob.com/python3/python3-string-zfill.html)|返回长度为 width 的字符串，原字符串右对齐，前面填充0|
|40|[isdecimal()](http://www.runoob.com/python3/python3-string-isdecimal.html)|检查字符串是否只包含十进制字符，如果是返回 true，否则返回 false。|


## list相关的函数
|序号|方法|描述|
|:---|:---|:---|
|1|[len(list)](http://www.runoob.com/python3/python3-att-list-len.html)|列表元素个数|
|2|[max(list)](http://www.runoob.com/python3/python3-att-list-max.html)|返回列表元素最大值|
|3|[min(list)](http://www.runoob.com/python3/python3-att-list-min.html)|返回列表元素最小值|
|4|[list(seq)](http://www.runoob.com/python3/python3-att-list-list.html)|将元组转换为列表|


|序号|方法|描述|
|:---|:---|:---|
|1|[list.append(obj)](http://www.runoob.com/python3/python3-att-list-append.html)|在列表末尾添加新的对象|
|2|[list.count(obj)](http://www.runoob.com/python3/python3-att-list-count.html)|统计某个元素在列表中出现的次数|
|3|[list.extend(seq)](http://www.runoob.com/python3/python3-att-list-extend.html)|在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）|
|4|[list.index(obj)](http://www.runoob.com/python3/python3-att-list-index.html)|从列表中找出某个值第一个匹配项的索引位置|
|5|[list.insert(index, obj)](http://www.runoob.com/python3/python3-att-list-insert.html)|将对象插入列表|
|6|[list.pop(obj=list[-1])](http://www.runoob.com/python3/python3-att-list-pop.html)|移除列表中的一个元素（默认最后一个元素），并且返回该元素的值|
|7|[list.remove(obj)](http://www.runoob.com/python3/python3-att-list-remove.html)|移除列表中某个值的第一个匹配项|
|8|[list.reverse()](http://www.runoob.com/python3/python3-att-list-reverse.html)|反向列表中元素|
|9|[list.sort([func])](http://www.runoob.com/python3/python3-att-list-sort.html)|对原列表进行排序|
|10|[list.clear()](http://www.runoob.com/python3/python3-att-list-clear.html)|清空列表|
|11|[list.copy()](http://www.runoob.com/python3/python3-att-list-copy.html)|复制列表|


## dict相关的函数
|序号|方法|描述|
|:---|:---|:---|
|1|[radiansdict.clear()](http://www.runoob.com/python3/python3-att-dictionary-clear.html)|删除字典内所有元素 |
|2|[radiansdict.copy()](http://www.runoob.com/python3/python3-att-dictionary-copy.html)|返回一个字典的浅复制|
|3|[radiansdict.fromkeys()](http://www.runoob.com/python3/python3-att-dictionary-fromkeys.html)| 创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值|
|4|[radiansdict.get(key, default=None)](http://www.runoob.com/python3/python3-att-dictionary-get.html)|返回指定键的值，如果值不在字典中返回default值|
|5|[key in dict](http://www.runoob.com/python3/python3-att-dictionary-in.html)|如果键在字典dict里返回true，否则返回false|
|6|[radiansdict.items()](http://www.runoob.com/python3/python3-att-dictionary-items.html)|以列表返回可遍历的(键, 值) 元组数组|
|7|[radiansdict.keys()](http://www.runoob.com/python3/python3-att-dictionary-keys.html)|以列表返回一个字典所有的键|
|8|[radiansdict.setdefault(key, default=None)](http://www.runoob.com/python3/python3-att-dictionary-setdefault.html)|   和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default|
|9|[radiansdict.update(dict2)](http://www.runoob.com/python3/python3-att-dictionary-update.html)|把字典dict2的键/值对更新到dict里|
|10|[radiansdict.values()](http://www.runoob.com/python3/python3-att-dictionary-values.html)|以列表返回字典中的所有值|
|11|[pop(key[,default])](http://www.runoob.com/python3/python3-att-dictionary-pop.html)|删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。否则，返回default值。|
|12|[ popitem()](http://www.runoob.com/python3/python3-att-dictionary-popitem.html)|随机返回并删除字典中的一对键和值。|


