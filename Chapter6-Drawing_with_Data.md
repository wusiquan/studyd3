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

![柱状图](https://github.com/wusiquan/studyd3/blob/master/images/chap6-1.png)


可以看见5根竖div，每个都是由dataset里的每个点生成。但它们之家没有空隙





