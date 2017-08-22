const superagent = require('superagent');
const cheerio = require('cheerio');
const { parallel } = require('async');

function catchData(callback) {

    parallel([
        getNumFun,
        getStrFun,
        getListFun,
        getDictFun
    ], (err, result) => {
        if (err) {
            throw new Error('error,error:', err);
        }
        var resObj = result[0];
        Object.assign(resObj, result[1], result[2], result[3]);
        callback(resObj);
    });

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

    function getStrFun(callback) {
        // 用 superagent 去抓取页面的内容
        superagent.get('http://www.runoob.com/python3/python3-string.html')
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

                    if (title[0] !== '序号') {
                        //跳出下一轮循环
                        return true;
                    }

                    //获取函数名称、链接、描述
                    var data = [];
                    $data.each((idx, ele) => {
                        var content = {};
                        if ($(ele).find('p').length !== 0) {
                            var cloneP = $(ele).clone();
                            cloneP.find(':nth-child(n)').remove();
                            content.desc = cloneP.text().replace('\n', '');
                            if (!content.desc) {
                                //针对坑爹的第一行
                                if ($(ele).find('p').length !== 0) {
                                    let cloneP = $(ele).find('p').clone();
                                    cloneP.find(':nth-child(n)').remove();
                                    content.desc = cloneP.text();
                                }
                            }

                            var $link = $(ele).find('a');
                            content.fun = $link.text();
                            content.link = $link.attr('href');
                        }
                        else {
                            content.count = $(ele).text();
                        }


                        data[idx] = content;
                    });

                    items[idx] = { title, data };
                });
                var data = { string: items.filter(x => x !== null) };
                callback(null, data);
            });
    }

    function getListFun(callback) {
        // 用 superagent 去抓取页面的内容
        superagent.get('http://www.runoob.com/python3/python3-list.html')
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

                    if (title[0] !== '序号') {
                        //跳出下一轮循环
                        return true;
                    }

                    //获取函数名称、链接、描述
                    var data = [];
                    $data.each((idx, ele) => {
                        var content = {};
                        if ($(ele).find('a').length !== 0) {
                            var cloneP = $(ele).clone();
                            cloneP.find(':nth-child(n)').remove();
                            content.desc = cloneP.text().replace('\n', '');

                            var $link = $(ele).find('a');
                            content.fun = $link.text();
                            content.link = $link.attr('href');
                        }
                        else {
                            content.count = $(ele).text();
                        }


                        data[idx] = content;
                    });

                    items[idx] = { title, data };
                });
                var data = { list: items.filter(x => x !== null) };
                callback(null, data);
            });
    }

    function getTupleFun(callback) {
        // 用 superagent 去抓取页面的内容
        superagent.get('http://www.runoob.com/python3/python3-tuple.html')
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

                    if (title[0] !== '序号') {
                        //跳出下一轮循环
                        return true;
                    }

                    //获取函数名称、链接、描述
                    var data = [];
                    $data.each((idx, ele) => {
                        var content = {};
                        if ($(ele).find('a').length !== 0) {
                            var cloneP = $(ele).clone();
                            cloneP.find(':nth-child(n)').remove();
                            content.desc = cloneP.text().replace('\n', '');

                            var $link = $(ele).find('a');
                            content.fun = $link.text();
                            content.link = $link.attr('href');
                        }
                        else {
                            content.count = $(ele).text();
                        }


                        data[idx] = content;
                    });

                    items[idx] = { title, data };
                });
                var data = { list: items.filter(x => x !== null) };
                callback(null, data);
            });
    }

    function getDictFun(callback) {
        // 用 superagent 去抓取页面的内容
        superagent.get('http://www.runoob.com/python3/python3-dictionary.html')
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    return console.log(err);
                }
                // sres.text 里面存储着网页的 html 内容
                var $ = cheerio.load(sres.text);
                var items = [];
                $('.reference').each(function (idx, ele) {
                    if (idx === 0) {
                        //跳出下一轮循环
                        return true;
                    }
                    var $title = $(ele).find('tr th');
                    var $data = $(ele).find('tr td');

                    //获取题目
                    var title = [];
                    $title.each((idx, ele) => {
                        title[idx] = $(ele).text();
                    });

                    if (title[0] !== '序号') {
                        //跳出下一轮循环
                        return true;
                    }

                    //获取函数名称、链接、描述
                    var data = [];
                    $data.each((idx, ele) => {
                        var content = {};
                        if ($(ele).find('a').length !== 0) {
                            var cloneP = $(ele).clone();
                            cloneP.find(':nth-child(n)').remove();
                            content.desc = cloneP.text().replace('\n', '');

                            var $link = $(ele).find('a');
                            content.fun = $link.text();
                            content.link = $link.attr('href');
                        }
                        else {
                            content.count = $(ele).text();
                        }


                        data[idx] = content;
                    });

                    items[idx] = { title, data };
                });
                var data = { dict: items.filter(x => x !== null) };
                callback(null, data);
            });
    }

}

module.exports = catchData;