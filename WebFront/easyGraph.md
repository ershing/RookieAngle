# CSS3中的图形
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 此文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/css3-easy-graph/ "点击我")

        CSS3出来之前，我们只能有矩形的图形，CSS3之后，clip-path和shape-outside可以做出很强大的图形功能，这里暂且不说。我们也可以通过border-radius、 border、 transform、 伪元素配合、gradient 渐变，我们能够作出非常多的几何图形，这里举例一下几个经典的样式：

        三角形：
```css
 .traingle {
   width: 0;
   height: 0;
   border-left: 50px solid transparent;
   border-right: 50px solid transparent;
   border-bottom: 100px solid lightblue;
 }
 ```
        梯形：
```css
.trapezoid {
    position: relative;
    width: 60px;
    padding: 60px;
}

.trapezoid::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: perspective(20px) scaleY(1.3) rotateX(5deg);
    transform-origin: bottom;
    background: lightblue;
}
```
        六边形：
```css
.hexagon {
    position: relative;
    width: 60px;
    border-bottom: 60px solid lightblue;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
}

.hexagon::before {
    content: "";
    position: absolute;
    width: 60px;
    height: 0px;
    top: 60px;
    left: -40px;
    border-top: 60px solid lightblue;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
}
```
        五角星：
```css
.star {
    margin: 50px 0;
    position: relative;
    width: 0;
    border-right: 100px solid transparent;
    border-bottom: 70px solid lightblue;
    border-left: 100px solid transparent;
    transform: rotate(35deg) scale(.6);
}

.star:before {
    content: '';
    position: absolute;
    border-bottom: 80px solid lightblue;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    top: -45px;
    left: -65px;
    transform: rotate(-35deg);
}

.star:after {
    content: '';
    position: absolute;
    top: 3px;
    left: -105px;
    border-right: 100px solid transparent;
    border-bottom: 70px solid lightblue;
    border-left: 100px solid transparent;
    transform: rotate(-70deg);
}
```
        椭圆：
```css
.ellipse {
    width: 120px;
    height: 160px;
    background-color: lightblue;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
```
        还有其他的一些可以直接看图：[效果](http://www.ershing.cn/example/some-graph)

        参考源码（反正我也是摘抄的）：[源码](https://github.com/ershing/RookieAngle/blob/master/WebFront/someGraph.html)

