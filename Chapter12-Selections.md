当你开始设计更复杂交互的部分，更深入的理解选取以及你可以怎样操作它，将使你做得更轻松(make your life a lot easier)

## 深入选取(A Closer Look at Selections)

阐明selection的概念

观察一个非常简单的选取，`d3.select('body')`的结果

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-2.png)



从图中看出一个，一个selection对象有两个数组，\_group和\_parents

_group中包含另一个数组，其包含一列DOM元素(本例为一个, body)



那么如果包含多个元素，selection对象看起来会是啥样?

我们可以看下之前的[散点图](https://wusiquan.github.io/studyd3/chapter8-5.html)

`d3.selectAll('rect')` 可以看到选取的数组包含50个圆

同时再展开查看circle元素，竟然发现\_\_data\_\_属性存储在其上 (图略)



## Data Join



https://bost.ocks.org/mike/join/

https://bl.ocks.org/mbostock/3808218



## Enter, Merge, and Exit

[例子预览](https://wusiquan.github.io/studyd3/chapter12-1.html)

例子中，代码事先准备了一些console.log，可以一次打开一个，看看控制台的输出

#### The Enter Selection

首先柱状图还没有的时候。。。看`svg.selectAll('rect')`

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

现在看起来，和普通选取相似了，但是_group数组中那一个数组内的20个元素还是EnterNode



最后看下`svg.selectAll('rect').data(dataset, key).enter().append('rect')`打印结果	

![a simple selection](https://github.com/wusiquan/studyd3/blob/master/images/chap12-9.png)

这下和普通选取一样了，之前的EnterNode都为rect了

the joined data也转移过来，可以看到rect的\__data\_\_属性(展开\_groups数组查看)



#### Merging Selections

这里说的一切东西都是在点击

先看添加一个新的元素:

看下`svg.selectAll('rect')`

![selectAll rect](https://github.com/wusiquan/studyd3/blob/master/images/chap12-10.png)

正如期望的，可以看到NodeList包含一个20元素

再看下`svg.selectAll('rect').data(dataset, key)`

![selectAll rect data](https://github.com/wusiquan/studyd3/blob/master/images/chap12-11.png)

和前面一样，data()返回的选取包含了enter和exit子选取

注意：

_enter包含的数组的length现在是21，即使它仅包含了一个EnterNode

_exit的length为20，尽管都是空的。这样是合理的，因为我们有20个bars，并没有在退出，所以为空

而_groups数组，包含的数组长度为21，其中最后一个是空



再看删除一个已有的元素:

`svg.selectAll('rect').data(dataset, key)`

![selectAll rect data](https://github.com/wusiquan/studyd3/blob/master/images/chap12-12.png)

_enter现在包含的数组长度为19，均为空

_exit包含的数组长度为20，其中第一个是rect，后面为空

而_groups数组，包含的数组长度为19个rect



回到添加一个元素

`bars.enter()`

![selectAll rect data](https://github.com/wusiquan/studyd3/blob/master/images/chap12-13.png)

就是之前的enter子选取，可以发现数组长度为21，但实际内容仅位一个在位置20的单个EnterNode



接着`bars.enter().append('rect')`

![selectAll rect data](https://github.com/wusiquan/studyd3/blob/master/images/chap12-14.png)

Boom! The EnterNode has blossomed into a beautiful react



创建了一个新的矩形，我们现在需要创建一个包括所有矩形的选取，这样我们就可以同时更新他们的属性 — x, y, width, height



我们将之前的选取与之前存在的bars合并，按惯例，这叫做the "update"选取

`bars.enter().append('rect').merge(bars)`

![selectAll rect data](https://github.com/wusiquan/studyd3/blob/master/images/chap12-15.png)

这样就有了，一个包含21个矩形的数组



#### The Exit Selection



如果还有疑问

http://animateddata.co.uk/lab/d3enterexit/  ([已翻译中文]())







