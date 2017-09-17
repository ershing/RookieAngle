# 使用ECharts绘制图表
###### 我的菜鸟仓库地址： [点击跳转查看其他相关文章](https://github.com/ershing/RookieAngle "菜鸟仓库")
###### 此文章在我的博客上的地址： [点击跳转](http://www.ershing.cn/easy-echarts/ "点击我")

        如果我们想绘制一些图表类的，用框架肯定非常简单就能绘制出我们需要的图表了，其实绘制图表的框架有很多，这里就用ECharts做一个简单的例子，也是非常容易上手的，官网：http://echarts.baidu.com/。

        引入echarts之后，步骤简单分为三步：

        1、为ECharts准备dom；

        2、设置配置项和数据；

        3、使用配置项和数据渲染图表。

        看起来是不是和模板引擎使用差不多呢？可以认为我们设置一个图表模板，然后在某个dom节点上渲染出来，就是那么简单。

        直接分解出三步来写一下代码：

        1、为ECharts准备dom：
```javascript
<div id="main" 
style="width: 600px; height: 400px; margin: 200px auto;">
</div>
```
        2、设置配置项和数据option：
```javascript
//设置图表标题
title: {
   text: 'web前端技术掌握程度表'
}
//设置数据名称
legend: {
   data:['掌握程度']
}
//设置 x 轴各项
xAxis: {
   data: ["HTML","CSS","JavaScript","Vue","React","Angular"]
}
//设置对应数据名称的实际值
series: [{
   name: '掌握程度',
   type: 'bar',
   data: [85, 80, 90, 85, 70, 50]
}]
```
        3、使用配置项和数据渲染图表
```javascript
myChart.setOption(option);
```
        就是这么简单了，完整代码为：[代码](https://github.com/ershing/RookieAngle/blob/master/WebFront/easyEcharts.html)，完整效果为：[图表](http://www.ershing.cn/example/easy-echarts.html)。

