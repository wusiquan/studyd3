有了第7章已有散点图的基础上，我们来添加横坐标和纵坐标

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

## 检查坐标轴标记



