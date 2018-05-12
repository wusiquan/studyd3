我们用目前的数据来继续操作

`var dataset = [5, 10, 15, 20, 25]`

## Drawing divs



#### Setting Attributes

`attr()` 用来给元素设置HTML属性和值

`.attr('class', 'bar')`



#### 关于html的class属性的注解(A Note on Classes)

注意元素的class存储在HTML的attribute中。反过来，这个class被用来指定css样式规则。这可能导致一些困惑，因为设置一个class和直接对元素应用style有一些区别。我推荐使用对大多数使用class properties，只对不同寻常的直接应用style。

同时提一下`classed`方法，用于从元素上快速应用和移除classes

`.classed("bar", true)`

true 应用，false 就是移除啦

 `.classed("bar", false)`



#### Back to the Bars

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

## data()的力量

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

最后，每个圆的半径r简单的设为d，对应数据的值（注意，永远不要用半径来表示数据的值，后面章节说明）



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
   .attr('height', (d) => d)
   .attr('x', (d, i) => {
     return i * (w / dataset.length)
   })
   .attr('y', (d) => h - d)
```

注意下，如果`attr('y', d)`，那么效果如下

![柱状图1](https://github.com/wusiquan/studyd3/blob/master/images/chap6-3.png)

原因是纵坐标增大方向是从上 -> 下

而上面代码展示的则是ok的

[例子预览](https://wusiquan.github.io/studyd3/chapter6-2.html)

#### 颜色(Color)



#### 文字标签(Labels)



## 制作一个散点图(Making a Scatterplot)





所以现在



