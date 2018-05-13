## 苹果和像素(Apples and Pixels)

想象下，下面的数据表示一个路边水果店每月苹果的销售量

```javascript
var dataset = [100, 200, 300, 400, 500]
```

显然，用一像素来表示卖出的一个苹果，不合适。。。

所以要搞 比例

## Domains and Ranges

比例的*输入域*(input domain)是可能输入数据的值的范围(range)。考虑前面的苹果数据，合适的输入域是100和500(数据的最小和最大值)或0和500

比例的*输出范围*(output range)是可能输出值的范围，通常以像素单位显示值。作为信息设计者，如果你决定最短的苹果柱状条10像素高，最高的苹果柱状条350像素高，你可以设置10和350的输出范围

例如，创建一个比例，*输入域* 为[100,500], 输出域为[10, 350]，那么传入100到比例中，应返回10。传入500，返回350。传入300，返回180

![输入输出](https://github.com/wusiquan/studyd3/blob/master/images/chap7-1.png)



## 标准化(Normalization)

标准化是一个映射一个数值到一个新值(在0-1之间)的过程，例如，一年有365天，那么310天，对应0.85, 或一年的85%



## 创建比例尺(Creating a Scale)

```javascript
var scale = d3.scaleLinear()
              .domain([100, 500])
              .range([10, 350])

scale(100)  // Returns 10
scale(300)  // Returns 180
scale(500)  // Returns 350
```



## 散点图中比例(Scaling the Scatterplot)

散点的数据是数组中的数组

将每个数组中第一个值映射到x坐标，将第二个值映射到y坐标

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

看一下，x的值5至480，所以我们的输入域可以指定为0,500，对吗？但是最好别写死，因为数据可能改变，我们要让我们的代码灵活并可扩展



#### d3.min()和d.max

```javascript
var simpleDataset = [7, 8, 4, 5, 2]
d3.max(simpleDataset);  // Returns 8

// 但是dataset如果不是像上面简单
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
d3.max(dataset)		// Returns [85, 21] What?

// 所以要告诉max，用哪个值做比较
d3.max(dataset, function(d) return d[0])
```



#### 创建动态比例(Setting Up Dynamic Scales)

```javascript
var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, d => d[0])])
               .range([0, w])

// 与xScale相似
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, d => d[1])])
               .range([0, h])
```

这里简单将domain的较低值，简单地设为了0，你也可以使用d3.min



#### 插入比例值(Incorporating Scaled Values)

```javascript
// 散点图添加两行
.attr('cx', d => xScale(d[0]))
.attr('cy', d => yScale(d[1]))

// 文字标签添加两行
.attr('x', d => xScale(d[0]))
.attr('y', d => yScale(d[1]))
```

[例子预览](https://wusiquan.github.io/studyd3/chapter7-1.html)



## 改善图(Refining the Plot)

你可能已经发现，小些的y值在图的上方，大写的y值在图的下方。

现在我们使用D3的比例，很简单就可以反转过来

仅仅将`range[0, h]` 改为`.range[h, 0]`

[例子预览](https://wusiquan.github.io/studyd3/chapter7-2.html)



但是，有些元素被切掉了，可以引入一个padding变量

```javascript
var padding = 20

// .range[0, w]
// 下面修改后，发现图右侧文字也被切掉了
// .range([padding, w - padding])
.range([padding, w - 2 * padding])

// .range[h, 0]
.range([h - padding, padding])
```

[例子预览](https://wusiquan.github.io/studyd3/chapter7-3.html)



> 这里直接使用padding也并不优雅，推荐阅读Mike Bostock的margin convention https://bl.ocks.org/mbostock/3019563



现在好多了！但是，现在不想设置圆的半径为y的平方根值(有点hack，并且视觉上也没用)，为什么不创建另一个自定义的比例?

```javascript
var rScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, d => d[1])])
               .range([2, 5])

// ...
.attr('r', d => rScale(d[1]))
```

[例子预览](https://wusiquan.github.io/studyd3/chapter7-4.html)

让你瞅瞅比例的力量，我们往dataset中添加一个数组\[600, 150\]

[例子预览](https://wusiquan.github.io/studyd3/chapter7-5.html)

可以发现之前的点是怎样保持它们的相对位置，仅仅移动更接近，向下向左，来适应右上角的新点

再将h从100改到300

[例子预览](https://wusiquan.github.io/studyd3/chapter7-6.html)

你会发现，你不会再因客户端希望图从600像素改为800，而苦逼地。。。



## 其他方法

d3.scaleLinear()有一些其他便捷方法

nice()

  将输入域的两端取整，如[0.201479..., 0.9996679…]，a nice domain可能试[0.2, 1.0]

rangeRound()

clamp()

```javascript
var scale = d3.scaleLinear()
              .domain([0.123, 4.567])
              .range([0, 500])
              .nice()
```



## 其他比例

除了linear比例，d3还有其他一些内置比例方法:

* scaleSqrt

    平方根比例

* scalePow

* scaleLog

* scaleQuantize

* scaleQuantile

* scaleOrdinal

* schemeCategory10, schemeCategory20, schemeCategory20b, schemeCategory20c

* scaleTime

探索两个比例: 平方根比例和时间比例



#### 平方根比例(Square Root Scales)

之前是对数据值(面积值)，作平方根处理

```javascript
.attr('r', d => Math.sqrt(d))
```

现在如果使用平方根比例

```javascript
.attr('r', d => aScale(d))  // 'a' scale for 'area'!
```

最大的好处是，可以利用比例能创建输入域和输出域的能力



上代码

```javascript
var aScale = d3.scaleSqrt()   // <-- New!
               .domain([0, d3.max(dataset, d => d[1])])
               .domain([0, 10])
```

[例子预览](https://wusiquan.github.io/studyd3/chapter7-7.html)



#### 时间比例(Time Scales)

至于时间格式，可以使用`var parseTime = d3.timeParse('%m/%d%y')` 

具体可以参考https://github.com/d3/d3-time-format#locale_format



使用scaleTime()定义time scale

```javascript
var xScale = d3.scaleTime()
               .domain([
                 d3.min(dataset, d => d.Data),
                 d3.max(dataset, d => d.Date)
               ])
               .range([padding, w - padding])

// actually call the scale
.attr('cx', d => xScale(d.Date))
```



接着还需要将Date值转为可读字符串

`var formatTime = d3.timeFormat('%b %e')`

同样查看

https://github.com/d3/d3-time-format#locale_format

```javascript
.text(d => formatTime(d.Date))
```

