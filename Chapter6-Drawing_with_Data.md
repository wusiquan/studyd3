#### 关于html的class属性的注解

注意元素的class存储在HTML的attribute中。反过来，这个class被用来指定css样式规则。这可能导致一些困惑，因为设置一个class和直接对元素应用style有一些区别。我推荐使用对大多数使用class properties，只对不同寻常的直接应用style。

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

![柱状图1](//github.com/wusiquan/studyd3/blob/master/images/chap6-1.png)


可以看见5根竖div，每个都是由dataset里的每个点生成。但它们之间没有空隙

#### data()的力量

可以不限于5个数据点

`var dataset = [ 25, 7, 5, 26, 11, 8, 25 .... ]`

![柱状图2](//github.com/wusiquan/studyd3/blob/master/images/chap6-2.png)

D3是如何按需extend我们的chart的呢?

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

`data()`的力量 — 足够机智地循环你抛给它的任何 dataset 的full length, 并执行链下面的每个方法，同时修改每个方法的执行环境，所以`d`总是指的是循环中当前数据点的数据

记住，是**data**驱动试图 — 而不是其他途径