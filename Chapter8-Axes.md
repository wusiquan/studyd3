有了第7章已有[散点图](https://wusiquan.github.io/studyd3/chapter7-7.html)的基础上，我们来添加横坐标和纵坐标

## 坐标介绍

axis的方法与scale方法相似，但不返回值，而是创建坐标轴元素



## 创建坐标轴

4个方法

- d3.axisTop
- d3.axisBottom
- d3.axisLeft
- d3.axisRight

我们从d3.axisBottom()开始来创建一个通用的坐标轴函数

`var xAxis = d3.axisBottom();`

每个坐标轴，最低也需要被告知使用的比例

`xAxis.scale(xScale);`

当然上面连个方法可以链式调用，但更简洁的写法  

`var xAxis = d3.axisBottom(xScale);`

接下来调用xAxis方法  

`svg.append('g').attr('class', 'axis').call(xAxis)`

为什么写法这么怪怪的, 与之前scale方法不同？因为axis方法实际上是在屏幕上画些东西，我们需要指定这些新元素，被放置的DOM位置，而这与xScale不同，它是计算一个值然后返回，实际上被另一个方法使用，根本不会影响DOM。所以...

这里用了d3.call()，其用于接收链中的前面链接传递给任何方法，这里将g传递给xAxis方法，所以坐标轴将在g中创建

当然如果你觉得上面写法不顺手，可以分开写

    svg.append('g')
       .call(d3.axisBottom())
       .scale(xScale)

[效果图](https://wusiquan.github.io/studyd3/chapter8-1.html)



## 坐标轴定位

我们来让坐标轴坐标轴出现在图表的底部，加一行即可

```javascript
svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0,' + (h - padding) + ')')
   .call(xAxis)
```

*g* 元素在DOM看起来就像这样了

`<g class="axis" transform="translate(0, 280)">`

当然还可以添加些css

```css
.axis text {
  fill: olive;
}
```

[效果图](https://wusiquan.github.io/studyd3/chapter8-2.html)



## 检查坐标轴刻度

直接上码

```javascript
var xAxis = d3.axisBottom()
              .sacle(xScale)
              .ticks(5)     // set rough number of ticks
```

[效果图](https://wusiquan.github.io/studyd3/chapter8-3.html)

你将发现，尽管我们指定了5个刻度，但出现了7个。

原因: **d3默认的tick-selection logic**

因为：

d3发如果分成5个，0, 150, 300, 450, 600 不够好看

所以d3认为`tick()`中的值仅仅是建议值，它将决定最整洁，易读的值。（此例，间距100）这将更易于扩展，如输入数据的范围变大或变小时, d3依然可以保证刻度标签易读。



当然你可以"指定"，这将覆盖*d3默认的tick-selection logic*

```javascript
var xAxis = d3.axisBottom()
              .scale(xScale)
              .tickValues([0, 100, 250, 600]);
```

![自定义散点图](https://github.com/wusiquan/studyd3/blob/master/images/chap8-1.png)



## Y坐标轴, 有何不可?

与已写的`xAxis`类似

在代码近顶部

```javascript
var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);
```

以及代码近底部，

顺便给y轴一些左侧空间

```javascript
var padding = 30
svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(' + padding + ',0)')
   .call(yAxis);
```

[效果图](https://wusiquan.github.io/studyd3/chapter8-4.html)



## 最后提及

证明给你看新坐标轴是动态的及可扩展的，我将从静态的数据改为随机数据

```javascript
// Dynamic, random dataset
var dataset = []
var numDataPoints = 50
var xRange = Math.random() * 1000
var yRange = Math.random() * 1000
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.floor(Math.random() * xRange)
  var newNumber2 = Math.floor(Math.random() * yRange)
  dataset.push([newNumber1, newNumber2])
}
```

[效果图](https://wusiquan.github.io/studyd3/chapter8-5.html)

每次重新刷新页面看看。可以看到坐标轴怎样去适应新的数据的范围，坐标刻度及标签值的被合适地选择



## 格式化坐标轴刻度标签

使用tickFormat()，首先定义一个新的*数字格式化*函数。例如，一个数字格式化函数将值格式化作保留一个小数点的百分数，即你输入0.23, 返回"*23.0%*"

```javascript
var formatAsPercentage = d3.format('.1%');

// ...

xAxis.tickFormat(formatAsPercentage)
```



## 基于时间的坐标轴

[效果图](https://wusiquan.github.io/studyd3/chapter8-6.html)

