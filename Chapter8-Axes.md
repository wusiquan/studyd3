有了第7章[已有散点图](https://wusiquan.github.io/studyd3/chapter7-2.html)的基础上，我们来添加横坐标和纵坐标

## 坐标介绍
axis的方法与scale方法相似，但不返回值，而是创建坐标轴元素
## 创建坐标轴
4个方法
  * d3.axisTop
  * d3.axisBottom
  * d3.axisLeft
  * d3.axisRight

我们从`d3.axisBottom()`开始来创建一个通用的坐标轴函数  
`var xAxis = d3.axisBottom();`

每个坐标轴，最低也需要被告知使用的比例
`xAxis.scale(xScale);`

当然上面连个方法可以链式调用，但更简洁的写法  
`var xAxis = d3.axisBottom(xScale);`

接下来调用xAxis方法  
`svg.append('g').attr('class', 'axis').call(xAxis)`  
为什么写法这么怪怪的, 与之前scale方法不同？因为axis方法实际上是在屏幕上画些东西，我们需要指定这些新元素，被放置的DOM位置，而这与xScale不同，它是计算一个值然后返回，实际上被另一个方法使用，根本不会影响DOM。所以...

这里用了d3.call()，其用于接收链中的前面链接传递给任何方法，这里将*g*传递给*xAxis*方法，所以坐标轴将在*g*中创建

当然如果你觉得上面写法不顺手，可以分开写
```javascript
svg.append('g')
   .call(d3.axisBottom())
   .scale(xScale)
```

[效果图](https://wusiquan.github.io/studyd3/chapter8-1.html)

## 坐标轴定位
