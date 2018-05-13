我们用目前的数据来继续操作

`var dataset = [5, 10, 15, 20, 25]`

## Drawing divs

#### 设置特性(Setting Attributes)

`attr()` 用来给元素设置HTML属性和值

`.attr('class', 'bar')`



#### 关于html的class属性的注解(A Note on Classes)

注意元素的class存储在HTML的attribute中。反过来，这个class被用来指定css样式规则。这可能导致一些困惑，因为设置一个class和直接对元素应用style有一些区别。我推荐使用对大多数使用class properties，只对不同寻常的直接应用style。

同时提一下`classed`方法，用于从元素上快速应用和移除classes

`.classed("bar", true)`

true 应用，false 就是移除啦

 `.classed("bar", false)`



#### 回到柱状图(Back to the Bars)

```javascript
var dataset = [ 5, 10, 15, 20, 25 ];

d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar");”
```

![柱状图1](https://github.com/wusiquan/studyd3/blob/master/images/chap6-1.png)


可以看见5根竖div，每个都是由dataset里的每个点生成。但它们之间没有空隙

## data()的力量(The Power of Data)

可以不限于5个数据点

`var dataset = [ 25, 7, 5, 26, 11, 8, 25 .... ]`

![柱状图2](https://github.com/wusiquan/studyd3/blob/master/images/chap6-2.png)

D3是如何按需扩展我们的柱状图的呢?

```javascript
d3.select('body').selectAll('div')
  .data(dataset)  // <-- The answer is here!
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', function(d) {
    var barHeight = d * 5
    return barHeight + 'px'
  })
```

`data()`的力量 — 足够机智地，循环抛给它的整个dataset , 并执行调用链下面的每个方法，同时修改每个方法的执行环境，所以`d`总是指的是循环中当前数据点的数据

记住，是**data**驱动试图 — 而不是其他途径



## Drawing SVGs

由于SVG元素存在于DOM中，正如HTML元素，我们可以使用`append()`和`attr()`同样地方式来创建SVG图形

#### 创建SVG(Create the SVG)

```javascript
var w = 500
var h = 50
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h)
```



#### 数据驱动的形状图形(Data-Driven Shapes)

```javascript
var circles = svg.selectAll('circle')
                 .data(dataset)
                 .enter()
                 .append('circle')

circles.attr('cx', function(d, i) {
          return (i * 50) + 25
        })
        .attr('cy', h/2)
        .attr('r', function(d) {
           return d
        })
```

最后，每个圆的半径r简单的设为d，对应数据的值（注意，永远不要用半径来表示数据的值，[见后面小节英文部分说明](#reason))



#### 美妙的色彩(Pretty Colors, Oooh!)

依然是`attr()`方法

在之前的基础，增加代码

```javascript
.attr('fill', 'yellow')
.attr('stroke', 'orange')
.attr('stroke-width', function(d) {
  return d/2
})
```

[例子预览](https://wusiquan.github.io/studyd3/chapter6-1.html)



## 制作一个柱状图(Making a Bar Chart)

#### 新的柱状图(The New Chart)

```javascript
// 不多介绍了，相信看得懂
var w = 500
var h = 100
var barPadding = 1
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr('width', w / dataset.length - barPadding)
   .attr('height', (d) => 4 * d)
   .attr('x', (d, i) => {
     return i * (w / dataset.length)
   })
   .attr('y', (d) => h - 4 * d)
```

注意下，如果`attr('y', d)`，那么效果如下

![柱状图1](https://github.com/wusiquan/studyd3/blob/master/images/chap6-3.png)

原因是纵坐标增大方向是从上 -> 下

而上面代码展示的则是ok的

同时为了看起来好看些，这里'height'设为4 * d

[例子预览](https://wusiquan.github.io/studyd3/chapter6-2.html)

#### 颜色(Color)

用数据来驱动颜色也很简单

```javascript
.attr('fill', function(d) {
  return "rgb(0, 0, " + Math.round(d * 10) + ")"
})
```

这将会使大些的值更蓝，而小点值更少蓝(接近黑)

[例子预览](https://wusiquan.github.io/studyd3/chapter6-3.html)

#### 文字标签(Labels)

有时需要在图形中加文字标签

```javascript
svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) {
     return d
   })
   // position the text
   .attr('x', function(d, i) {
     return i * (w/dataset.length)
   })
   .attr('y', function(d) {
     return h - (4 * d) 
   })
```

[效果预览](https://wusiquan.github.io/studyd3/chapter6-4.html)

文字显示对应的值，但还需要调整下

```javascript
svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) {
     return d
   })
   // position the text
   .attr('x', function(d, i) {
     return i * (w / dataset.length)
   })
   .attr('y', function(d) {
     return h - (4 * d)
   })
```

[效果预览](https://wusiquan.github.io/studyd3/chapter6-5.html)



## 制作一个散点图(Making a Scatterplot)

散点图是在两个不同的坐标轴(横坐标x,纵坐标y)表示二组对应值的可视化通用类型

#### 数据(The Data)

使用二维数组

```javascript
var dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88]
]
```



#### 散点图(The Scatterplot)

直接上码

```javascript
// bar chart中见过了
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

svg.selectAll('circle')		// <-- No longer 'rect'
   .data(dataset)
   .enter()
   .append('circle')
   .attr('cx', d => d[0])
   .attr('cy', d => d[1])
   .attr('r', 5)
```

[效果预览](https://wusiquan.github.io/studyd3/chapter6-6.html)

#### 大小

可能你希望这些圆有不同的大小，这样每个圆的面积对应它的y值

为什么散点图中的圆，用面积(area)来表示值(value)？

<div id="reason">As a general rule, when visualizing quantitative values with circles, make sure to encode the values as area, not as a circle’s radius. Perceptually, humans interpret the overall amount of “ink” or pixels (the area) to reflect the data value. A common mistake is to map the value to the radius, which would vastly overrepresent the data and distort the relative relationship between values. (For that matter, humans are not so great at accurately comparing areas, either, but that’s another discussion.) Mapping to the radius is easier to do, as it requires less math, but the result will visually distort your data.</div>

开始修改，首先圆的的面积(值)设为 h - d[1], 这样高的代表值大一些(Admittedly, it is not a meaningful to include h here; please just bear with me for the sake of the example. I promise to illustrate a cleaner and more meaningful approach using scales in Chapter 7.)

```javascript
.attr('r', function(d) {
  return Math.sqrt( (h - d[1]) / Math.PI )
})

// => 由于同比例，我们去掉Math.PI
// 因为这里的重要的是相对值而不是绝对值
// 实际的圆大小会由于你使用设备(手机, 平板...)还是显示器变化很大
// 除以Math.PI不过让圆均小了一些
.attr('r', function(d) {    
  return Math.sqrt(h-d[1])
})
```

[效果预览](https://wusiquan.github.io/studyd3/chapter6-7.html)

这里圆面积的特殊使用，并不有用

这里仅仅是展示怎样使用d，做一些转换然后返回给attr方法。。。



#### 标签(Labels)

直接开动~

```javascript
svg.selectAll('text')   // <-- Note 'text', not 'circle' or 'rect'
   .data(dataset)
   .enter()
   .append('text')
   .text(d => d[0] + ',' + d[1])
   .attr('x', d => d[0])
   .attr('y', d => d[1])
   // add a bit of font styling
   .attr('font-family', 'sans-serif')
   .attr('font-size', '11px')
   .attr('fill', 'red')
```

[效果预览](https://wusiquan.github.io/studyd3/chapter6-8.html)









