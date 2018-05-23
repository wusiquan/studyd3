当你开始设计更复杂交互的部分，更深入的理解选取以及你可以怎样操作它，将使你做得更轻松(make your life a lot easier)

## 深入选取(A Closer Look at Selections)

阐明selection的概念

观察一个非常简单的选取，`d3.select('body')`的结果

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-2.png)



从图中看出一个，一个selection对象有两个数组，\_group和\_parents

_group中包含另一个数组，其包含一列DOM元素(本例为一个, body)



那么如果包含多个元素，selection对象看起来会是啥样?

我们可以看下之前的[散点图]()

可以到选取的数组包含50个圆



同时再展开查看circle元素，竟然发现\_\_data\_\_属性存储在其上 (图略)



## Data Join



https://bost.ocks.org/mike/join/

https://bl.ocks.org/mbostock/3808218



## Enter, Merge, and Exit

[例子预览]()

例子代码事先了，准备了一些console.log，可以一次打开一个，看看控制台的输出

#### The Enter Selection

首先柱状图还没有的时候。。。

看`svg.selectAll('rect')`

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-4.png)

_groups为一个数组，包含一个空NodeList



接着看`svg.selectAll('rect').data(dataset, key)`

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-5.png)

很有趣，选取从a data join返回，同时包含了\_enter和\_exit子选取

展开查看

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-6.png)

_exit为一个数组，包含一个空数组，可以理解

_enter为一个数组，包含一个长度为20的数组，并且每个元素为EnterNode。他们是绑定了数据的神奇的占位元素

展开`EnterNode`

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-7.png)

可以看到\_\_data\_\_已绑定上了

现在再来打印`svg.selectAll('rect').data(dataset, key).enter()`

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-8.png)

现在看起来，和普通选取相似了，但是_group数组中那一个数组内的元素还是EnterNode



最后``svg.selectAll('rect').data(dataset, key).enter().append('rect')`

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-9.png)

这下和普通选取相似了，之前的EnterNode都为rect了

the joined data也转移过来，可以看到rect的\__data\_\_属性



http://animateddata.co.uk/lab/d3enterexit/  ([已翻译中文]())

















