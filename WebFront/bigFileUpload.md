# 大文件分块上传、断点续传
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 此文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/big-file-upload/ "点击我")

        很多时候我们需要上传文件，都会用到直接form-data的方式上传，但是如果文件太大呢，例如一个500MB的文件，服务器端对请求数据有大小要求限制怎么办，不可能整个大文件传输，又或者你想读取文件内容怎么办，这么大的文件全部读入内存？浏览器不答应吧。所以我们就想到分块的方法。

        主要用到的是HTML 5 的file相关的api，这里不讨论相关读取文件内容（其实也不过是用了FileReader 对象的readAsArrayBuffer方法而已），这里单纯实现文件分块，然后上传，当然还有断点续传。下面只展示关键代码。

        废话少说，先来个HTML的框架大致内容用于测试，一个选择文件按钮，一个上传按钮：
```html
<input type="file" id="files" name="file" />
<input id="uploadBtn" type="button" value="上传">
```
        然后开始script标签内容了，先DOM获取文件和按钮、并设置上传的地址：
```javascript
var input = document.getElementById('files');
var upload = document.getElementById('uploadBtn');
//自己建立一个测试的服务器，后面会提到后端的代码
var host = 'http://localhost:10000/attachment/upload'
```
        好了，获取到文件之后，就要开始切割了，切割考虑到不同浏览器的兼容性问题，所以要做个判断：
```javascript
var blob;
if (file.webkitSlice) {
      blob = file.webkitSlice(fileLoaded, fileLoaded + block);
} else if (file.mozSlice) {
       blob = file.mozSlice(fileLoaded, fileLoaded + block);
} else if (file.slice) {
      blob = file.slice(fileLoaded, fileLoaded + block);
} else {
      alert('不支持分段读取！');
}
```
        切割完之后，就要放进去新创建的FormData对象里面了：
```javascript
var formData = new FormData();
formData.append("fileBlob", blob);
```
        最后，用jquery的ajax异步上传，在回调的地方判断文件是否完成整个切割上传，如果还没上传完成，继续切割继续上传：
```javascript
$.ajax({
    url: host+'/base_data_service/pic/upload',
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
        if (data.guid) {
            //用guid来标识某个文件
        }
        if (percent < 1) {
            // 继续切割下一块
        } else {
            // 结束
            console.log('已完成文件存储');
        }
        return;
    },
    error: function (data) {
        console.log('上传出现错误', data);
    }
});
```
        至于怎样断点续传呢？就是在每次回调的地方存储文件已经切割上传的位置，那么即使断网了，再连上去下一次也知道从哪里开始继续切割了。

        参考代码并不完全严谨，只是提供一个总体思路。

        完整的前端代码可以参考：[前端代码参考](https://github.com/ershing/RookieAngle/blob/master/HTML5&CSS3/upload_client.html)

        当然了，这个前端代码还是要配合后端的操作的，这里后端用node写的，也可以参考一下：[后端代码参考](https://github.com/ershing/RookieAngle/blob/master/HTML5&CSS3/upload_server.js)
