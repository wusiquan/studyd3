## 让柱状图时髦(Modernizing the Bar Chart)

![柱状图9-1](https://github.com/wusiquan/studyd3/blob/master/images/chap9-1.png)

下图看起来与上图相似，但是本质上做了很多改动

![柱状图9-2](https://github.com/wusiquan/studyd3/blob/master/images/chap9-2.png)

首先，调整了宽和高，让柱状图更高且宽

```javascript
var w = 600
var h = 250
```

接着，引入了 *序数比例* 来处理沿x轴 左/右 柱以及标签的位置 

```javascript
var xScale = d3.scaleBand()
			    // sets the input domain for the scale
               .domain(d3.range(dataset.length))
               .range([0, w])
               .paddingInner(0.05)
```



#### 解释序数比例(Ordinal Scales, Explained)

序数比例，最典型地用于序数数据，通常根据一些内在的顺序来将它们分类，如

* B级，A级，AA级
* 大一，大二，大三，大四  (.domain(['freshman', 'sophomore', 'junior', 'senior']))
* 非常不喜欢，不喜欢，中性，喜欢，非常



#### 开始你的band比例(starting your own band)

```javascript
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               // rangeRound()方法比round()更简洁，且也能将值取整
               .rangeRound([0, w])
               .paddingInner(0.05)
```

d3的band scales依据输入域，自动平均划分输出范围为相等的"段"，

例如，输入域有20个值，`.range([0, w])`，意味着，每一段为 (600 - 0) / 20 = 30"宽"



`paddingInner()`可以指定每个柱子的间距

`paddingInenr(0.05)`即柱子5%的宽度，这里为 (600 - 0) / 20 = 30, 30 * 0.05 = 1.5，即1.5像素

但是有反锯齿，看起来有点模糊，可以使用`round(true)`，也可以使用第8章提到的css规则，`shape-rendering:crispEdges`



#### 引用Band比例(Referencing the Band Scale)

[例子预览](https://wusiquan.github.io/studyd3/chapter9-1.html)

注意看代码

```javascript
svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr('x', function(d, i) {
      return xScale(i)   // <-- set x values
   })
   // ...
```

我们将i传递给xScale，同样地，我们使用了相同的值(0, 1, 2, 3...)作为band scale的输入域。所以调用xScale(i)，将查找对应的输出值



更好的是，设置这些柱子的宽度，更容易，之前可能要这样

`.attr('width', w / dataset.length - barPadding)`

现在让band scale为我们计算即可

`.attr('width', xScale.bandwidth())`



## 更新数据(Updating Data)

最简单更新方式，是将所有数据的值同时更新，而数据的量保持不变

基本方法:

* 修改dataset的值
* 重新将值绑定到已存在的元素上(因此重写了原先的值)
* 根据需要设置新的属性值来更新视觉展示

为了能看得清楚发生的变化，我们使用鼠标点击事件

#### 修改数据(Changing the Data)

```javascript
// step1, overwrting the original values
dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
            5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
// rebind 
svg.selectAll('rect')
   .data(dataset)
```

####更新视觉展示(Updating the Visuals)

很简单，只要简单的复制，粘贴之前相关代码

```javascript
svg.selectAll('rect')
   .data(dataset)
   .attr('y', (d) => {
     return h - yScale(d)
   })
   .attr('height', (d) => {
     return yScale(d)
   })
```

显然，还需要再次设置颜色，文字标签。。

[效果](https://wusiquan.github.io/studyd3/chapter9-2.html)

点击文字"click me"看看变化



## 过渡(Transitions)

加上一行代码即可构造一个美妙，丝滑的过渡动画

`.transition()`

[例子效果](https://wusiquan.github.io/studyd3/chapter9-3.html)

现在点击文字"click me"就可以看到过渡动画



#### duration()或多久过渡完(duration(), or How Long Is This Going to Take?)



