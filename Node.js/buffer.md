# 关于Node.js的Buffer对象
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 此文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/nodejsbuffer/ "点击我")

        关于Node.js的Buffer对象，其实和前面写的文章（[关于Node.js的字符编码](https://github.com/ershing/RookieAngle/blob/master/Node.js/encoding.md)）有很大关系。

        因为在最初写Node.js，用到Buffer的时候，感觉这个东西有点飘渺，它是怎样的一种存在呢？这篇文章会好好说一说。

        在说Buffer之前，想先说一下Web Api 的一些内容先，其实也是密切相关的。

        先说一下[File](https://developer.mozilla.org/en-US/docs/Web/API/File)对象和[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)对象。

        File对象通常来自一些类似选择文件等操作返回的FileList 对象，这个File存放着对应文件的一些信息，包括文件名称、文件大小、文件类型、文件位置、最后修改时间等等的信息，File对象继承了Blob对象的方法，是一个特殊的Blob。

        而Blob对象，是通过Blob( ) 构造函数得来的，例如下面这样创建Blob对象：
```javascript
var blob = new Blob([JSON.stringify(debug, null, 2)],{type : 'application/json'});
  ```
        Blob对象表示一个不可变的、原始数据的类似文件对象，也有文件大小、类型等属性，其实可以说File对象就是关于一个完整文件的信息，而Blob对象是关于一段文件的信息，无论文件是否被切割了很多块（slice( )方法）。

        好了，既然有了这两个对象，那么我们如何读取这两个对象（File对象和Blob对象）对应的文件内容呢？

        Web Api又有一个[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 对象给我们读取文件，它有那么的几种方法：readAsArrayBuffer( )（读取文件结果中包含ArrayBuffer对象）、readAsBinaryString( )（读取文件结果中包含文件的原始二进制数据）、readAsDataURL( )(读取文件结果中包含一个URL格式的字符串以表示所读取文件的内容)、readAsText( )（读取文件结果中包含一个字符串以表示所读取的文件内容）。

        后面两种方法容易理解，而readAsBinaryString( )在W3C中已经被废除，生产环境中不推荐使用，这里就不说了，这里就说readAsArrayBuffer( )结果中包含的这个ArrayBuffer对象。

        通俗来讲，[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)对象代表一个有固定长度的二进制数据数组，你创建一个ArrayBuffer对象的时候，就好像下面这样：
```javascript
var buffer = new ArrayBuffer(8);
```
        这样你就创建了一个长度为8byte的缓冲区，不给参数是默认用0来填充数据的。

        其实，你创建的这个buffer只是代表某个数据块的对象，并没有提供方法来操作其中的数据内容，在 ECMAScript 2015 (ES6) 引入 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 之前，JavaScript 语言没有读取或操作二进制数据流的机制。

        好了，怎么又来个TypedArray 了，它其实不是一般的Array，它是类型化数组，它用来创建操作二进制数据的视图（[DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)也可以做到，类似TypedArray），包含很多构造方法：Int8Array 、Uint8Array、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array 等。所以如果我们想创建一个缓冲区，并建立一个队缓冲区操作的视图的话，可以这样写：
```javascript
var buffer = new ArrayBuffer(8); //创建缓冲区
var view = new Int32Array(buffer); //创建操作视图
view[0] = 38; //操作数据
console.log(view[0]); //打印结果为38
```
        好了，该回过头来说说Node.js的Buffer对象了，

        其实Buffer 实例对象也是 Uint8Array 实例对象，但有一些不同，尚且不谈论不同的地方，Buffer 类被引入使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流，所以它就是一个操作二进制数据流的工具。

        它可以这样创建缓冲区：
```javascript
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buffer = Buffer.alloc(10);
```
        可以这样直接创建含有数据的缓冲区：
```javascript
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buffer = Buffer.from([1, 2, 3]);
```
```javascript
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buffer = Buffer.from('tést');
```
```javascript
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buffer = Buffer.from('tést', 'latin1');
```
        好像前面那样，将ArrayBuffer 对象放进去也是可以的：
```javascript
const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);

console.log(buffer.buffer === arrayBuffer); //true
```
        当然了，拷贝TypedArray 实例内容也是可以的：
```javascript
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

// 拷贝 `arr` 的内容
const buf1 = Buffer.from(arr);
```
        上面这些例子基本摘抄自[Node.js官网文档](http://nodejs.cn/api/buffer.html)，其实说到底，Node.js中的Buffer对象是一个大类，包括很多方法来操作二进制数据，就是这样的。

 
