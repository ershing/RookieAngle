# HTML5中的简单过渡效果
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 此文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/easy-transition/ "点击我")

        网页的动画越来越多样化，而且HTML5越来越得到更多的支持，我们可以结合CSS3（主要用到transition和animation两种方式）和js脚本来实现很多复杂的动画和特效。这里举一个超级简单例子展示一下：

        我们实现一个按钮及其过渡效果，最后效果这样：[效果](http://www.ershing.cn/example/button.html)

        先设置一个div，里面放一个链接a标签，文字为“点击按钮”：
```html
 <div>
   <a href="http://www.ershing.cn">点击按钮</a>
 </div>
 ```
        然后设置外面的样式，使得div大概居于屏幕中间，背景颜色为浅蓝色：
```css
 body{
   width:100%;
   height:100%;
   background:lightblue;
 }
 div{
   background:lightblue;
   height:60%;
   width:30%;
   margin:20% auto;
   text-align:center;
 }
 ```
        然后设置a标签的样式为白色边框，白色底，还有一些文字间隔大小等内容：
```css
 a {
   display: block;
   margin:50px;
   color: white;
   text-decoration: none;
   font-family: sans-serif;
   font-size: 25px;
   line-height: 60px;
   border: 1px solid white;
   border-radius: 10px;
   text-align: center;
   text-indent :20px;
   letter-spacing: 20px;
 }
 ```
        再设置它的鼠标放置上面之后（hover）的样式：
```css
 a:hover {
   color: purple;
   background: white;
   border:1px solid plum
 }
 ```
        好了，基本样式就搞定了，我们发觉这样每次放置鼠标上去和离开鼠标都有一种很突然的感觉，这里就要用到过度效果了，给a加一个匀速的0.5s转换效果：
```css
 -webkit-transition: all .5s linear;
 transition: all .5s linear;
 ```
        好了，基本就搞定了，源码参考：[源码](https://github.com/ershing/RookieAngle/blob/master/WebFront/button.html)

        效果可以参考：[效果](http://www.ershing.cn/example/button.html)

        其实压根就是非常简单的用了一个transition过渡，不过结合css样式一起，我们可以得到很多我们想要的效果。

