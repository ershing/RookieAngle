# Node.js简单爬虫爬取python一些函数
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/nodejslovespython/ "点击我")

        哈哈，是不是很坑爹的题目，用Node.js爬虫爬python的东西，还将文章放在了python栏目的下面了。

        不然，正所谓“射人先射马，擒贼先擒王”，要学好python，当然要抓住他的要害对不对，其实python的一些数据类型或者基本语法都和同类型语言都差别不大，所以看一下就很容易掌握了，但是一些内置函数就需要我们认真看看，你会发觉原来有个这么简单的函数用的啊。

        不过，虽然是不同的编程语言，但是编程思想都是接近的，同类型语言中，他用这个函数，你换个形式，你用这个写法，他换个套路，其实都是一样的。

        所以，这次爬东西也只是玩玩，爬来的函数也方便以后可以查询。

        废话少说，这次主要爬取一下菜鸟教程网站http://www.runoob.com/，这个网站特别适合广大菜鸟学习，学习内容很多。

        这次用到Node.js的几个模块：superagent用来发出请求，cheerio用来处理数据，async用来解决异步回调，pug模板引擎。

        大概流程：

        1.爬取网站的python3栏目（http://www.runoob.com/python3/python3-tutorial.html）下的数字、字符串、列表、字典等相关页面。

        2.提取页面中的函数表单数据。

        3.将数据生成组合，生成markdown文件。

        Life is short , show me the code!

        以爬取number类型的相关函数为例，其他雷同，可看源码。

        直接来爬取并处理的函数：
```javascript
    function getNumFun(callback) {
        // 用 superagent 去抓取页面的内容
        superagent.get('http://www.runoob.com/python3/python3-number.html')
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    return console.log(err);
                }
                // sres.text 里面存储着网页的 html 内容
                var $ = cheerio.load(sres.text);
                var items = [];
                $('.reference').each(function (idx, ele) {
                    var $title = $(ele).find('tr th');
                    var $data = $(ele).find('tr td');

                    //获取题目
                    var title = [];
                    $title.each((idx, ele) => {
                        title[idx] = $(ele).text();
                    });

                    if (title[0] !== '函数') {
                        //跳出下一轮循环
                        return true;
                    }

                    //获取函数名称、链接、描述
                    var data = [];
                    $data.each((idx, ele) => {
                        var content = {};
                        var $link = $(ele).find('a');
                        if ($link.length !== 0) {
                            content.fun = $link.text();
                            content.link = $link.attr('href');
                        }
                        else {
                            var $p = $(ele).find('p');
                            if ($p.length !== 0) {
                                content.fun = $(ele).text();
                            }
                            else {
                                content.desc = $(ele).text();
                            }
                        }
                        data[idx] = content;
                    });

                    items[idx] = { title, data };
                });
                var data = { number: items.filter(x => x !== null) };
                callback(null, data);
            });
    }
```
        其实爬取网页数据只不过是发出请求，关键还是提取数据，在这里用的cheerio模块类似jquery的用法，所以还是可以很轻易获取到数据，不同页面提取数据的方法与本身的网页内容结构很大关系，这里虽然相近，但是都分别做了对应提取数据处理，然后自己保存在自己设计的数据格式里面。

        好了，拿到数据，然后就利用模板引擎写入markdown文件了，不要问我为什么写入markdown，我只是方便摆上github，因为这种文档展现形式感觉比较顺眼，模板代码如下：
```pug
if number
    |# number相关的函数
    |
    each val,index in number
        each va,ind in val.title
            ||#{va}
            if ind === val.title.length-1
                ||
                |
        each va,ind in val.title
            ||:---
            if ind === val.title.length-1
                ||
                |
        each va,ind in val.data
            if(va.fun)
                if(va.link)
                    ||[#{va.fun}](http://www.runoob.com#{va.link})
                else
                    ||#{va.fun}
            else
                ||#{va.desc}|
                |
        |
        |
        |
```
        至于模板语法和markdown语法，可以自行google，都是非常简单的一看就明白。

        最后就简单处理，写入文件：
```javascript
function markdown(item) {
    const pugPath = path.resolve(__dirname,'../numbers.pug');
    const compile = pug.compileFile(pugPath);
    const data = compile(item).replace('\n||','');
    fs.writeFileSync('list.md',data);
    console.log('输出成功');
}
```
        好了，基本这样就大功告成了，因为只是粗略地获取一下数据和粗略地写入数据，没有考虑太多细节，可以自行润色或选择网站。

        最后贴一下爬取整理最后的效果：[最后效果](https://github.com/ershing/RookieAngle/blob/master/python/superagent/list.md)

        贴一下GitHub上所有源码的项目地址：[项目源码地址](https://github.com/ershing/RookieAngle/tree/master/python/superagent)