// selectAllAnimation(
//   {type: "selection", name: "selection", children: [
//     {type: "array", name: "group", children: [
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"}
//     ]},
//     {type: "array", name: "group", children: [
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"}
//     ]},
//     {type: "array", name: "group", children: [
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"}
//     ]},
//     {type: "array", name: "group", children: [
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"},
//       {type: "element", name: "td"}
//     ]}
//   ]},
//   24 * 16,
//   {type: "selection", name: "selection", children: [
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]},
//     {type: "array", name: "group", children: [{type: "element", name: "span"}]}
//   ]},
//   24 * 16
// ).on("start", function() {
//   d3.select("#select-all-2-1").style("background", "#ff0");
// }).on("middle", function() {
//   d3.select("#select-all-2-1").style("background", null);
// }).on("end", function() {
//   d3.select("#select-all-2-2").style("background", "#ff0");
// }).on("reset", function() {
//   d3.selectAll("#select-all-2-1,#select-all-2-2").style("background", null);
// });

var treeData = {
  "name": "Top Level",
  "children": [
    {
      "name": "Level 2: A",
      "children": [{
        "name": "Son of A"
      }, {
        "name": "Daughter of A"
      }]
    }, 
    {
      "name": "Level 2: B"
    }
  ]
};
// https://bl.ocks.org/d3noob/b024fcce8b4b9264011a1c3e7c7d70dc
// let treeLayout = d3.tree().size([400, 200])
// let root = d3.hierarchy(treeData)
// treeLayout(root)

// var svg = d3.select("body")
//   .append("svg")
//   .attr('viewBox', '0 0 400 400')
//   .attr('version', '1.1')
//   .attr("width", 400)
//   .attr("height", 400)

// var g1 = svg.append('g').attr('class', 'nodes')
// var g2 = svg.append('g').attr('class', 'links')

// d3.select('svg g.nodes')
//   .selectAll('circle.node')
//   .data(root.descendants())
//   .enter()
//   .append('circle')
//   .classed('node', true)
//   .attr('cx', function (d) {
//     return d.x;
//   })
//   .attr('cy', function (d) {
//     return d.y;
//   })
//   .attr('r', 4);

// d3.select('svg g.links')
//   .selectAll('line.link')
//   .data(root.links())
//   .enter()
//   .append('line')
//   .classed('link', true)
//   .attr('x1', function (d) {
//     return d.source.x;
//   })
//   .attr('y1', function (d) {
//     return d.source.y;
//   })
//   .attr('x2', function (d) {
//     return d.target.x;
//   })
//   .attr('y2', function (d) {
//     return d.target.y;
//   });


// https://godbasin.github.io/2018/01/01/d3-tree-notes-2-init-a-d3-tree/
// https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd
// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;
// Assigns the x and y position for the nodes
var treeData = treemap(root);

// Collapse after the second level
root.children.forEach(collapse);
update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {
  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 180 
  });

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
}
// var margin = {
//     top: 0,
//     right: 40,
//     bottom: 0,
//     left: 40
//   },
//   width = 720,
//   step = 100;

// function tree(leftRoot, rightRoot, outerHeight) {
//   if (arguments.length < 3) outerHeight = rightRoot, rightRoot = null;

//   var height = outerHeight - margin.top - margin.bottom;

//   var tree = d3.layout.tree()
//     .size([height, 1])
//     .separation(function () {
//       return 1;
//     });

//   var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .style("margin", "1em 0 1em " + -margin.left + "px");

//   var g = svg.selectAll("g")
//     .data([].concat(
//       leftRoot ? {
//         type: "left",
//         nodes: tree.nodes(leftRoot)
//       } : [],
//       rightRoot ? {
//         type: "right",
//         nodes: tree.nodes(rightRoot).map(flip),
//         flipped: true
//       } : []
//     ))
//     .enter().append("g")
//     .attr("class", function (d) {
//       return d.type;
//     })
//     .attr("transform", function (d) {
//       return "translate(" + (!!d.flipped * width + margin.left) + "," + margin.top + ")";
//     });

//   var link = g.append("g")
//     .attr("class", "link")
//     .selectAll("path")
//     .data(function (d) {
//       return tree.links(d.nodes);
//     })
//     .enter().append("path")
//     .attr("class", linkType);

//   var node = g.append("g")
//     .attr("class", "node")
//     .selectAll("g")
//     .data(function (d) {
//       return d.nodes;
//     })
//     .enter().append("g")
//     .attr("class", function (d) {
//       return d.type;
//     });

//   node.append("rect");

//   node.append("text")
//     .attr("dy", ".35em")
//     .text(function (d) {
//       return d.name;
//     })
//     .each(function (d) {
//       d.width = Math.max(32, this.getComputedTextLength() + 12);
//     })
//     .attr("x", function (d) {
//       return d.flipped ? 6 - d.width : 6;
//     });

//   node.filter(function (d) {
//       return "join" in d;
//     }).insert("path", "text")
//     .attr("class", "join");

//   svg.call(reset);

//   function flip(d) {
//     d.depth *= -1;
//     d.flipped = true;
//     return d;
//   }

//   return svg;
// }

// function linkType(d) {
//   return d.target.type.split(/\s+/).map(function (t) {
//       return "to-" + t;
//     })
//     .concat(d.source.type.split(/\s+/).map(function (t) {
//       return "from-" + t;
//     }))
//     .join(" ");
// }

// function reset(svg) {
//   svg.selectAll("*")
//     .style("stroke-opacity", null)
//     .style("fill-opacity", null)
//     .style("display", null);

//   var node = svg.selectAll(".node g")
//     .attr("class", function (d) {
//       return d.type;
//     })
//     .attr("transform", function (d, i) {
//       return "translate(" + d.depth * step + "," + d.x + ")";
//     });

//   node.select("rect")
//     .attr("ry", 6)
//     .attr("rx", 6)
//     .attr("y", -10)
//     .attr("height", 20)
//     .attr("width", function (d) {
//       return d.width;
//     })
//     .filter(function (d) {
//       return d.flipped;
//     })
//     .attr("x", function (d) {
//       return -d.width;
//     });

//   node.select(".join")
//     .attr("d", d3.svg.diagonal()
//       .source(function (d) {
//         return {
//           y: d.width,
//           x: 0
//         };
//       })
//       .target(function (d) {
//         return {
//           y: 88,
//           x: d.join * 24
//         };
//       })
//       .projection(function (d) {
//         return [d.y, d.x];
//       }));

//   svg.selectAll(".link path")
//     .attr("class", linkType)
//     .attr("d", d3.svg.diagonal()
//       .source(function (d) {
//         return {
//           y: d.source.depth * step + (d.source.flipped ? -1 : +1) * d.source.width,
//           x: d.source.x
//         };
//       })
//       .target(function (d) {
//         return {
//           y: d.target.depth * step,
//           x: d.target.x
//         };
//       })
//       .projection(function (d) {
//         return [d.y, d.x];
//       }));
// }

// function selectAllAnimation(startRoot, startHeight, endRoot, endHeight) {
//   var end = tree(endRoot, endHeight).remove(),
//     event = d3.dispatch("start", "middle", "end", "reset"),
//     height = +end.attr("height"),
//     start = tree(startRoot, startHeight).attr("height", height),
//     svg = start.node(),
//     offset = (endHeight - startHeight) / 2,
//     transform = "translate(" + margin.left + "," + offset + ")";

//   var play = start.append("g")
//     .attr("class", "play");

//   play.append("circle")
//     .attr("r", 45)
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")");

//   play.append("path")
//     .attr("d", "M-22,-30l60,30l-60,30z")
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")scale(.7)");

//   play.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mousedown", function () {
//       play.classed("mousedown", true);
//       d3.select(window).on("mouseup", function () {
//         play.classed("mousedown", false);
//       });
//     })
//     .on("click", function () {
//       resetAll();
//       animation();
//     });

//   end = d3.select(svg.appendChild(end.node().firstChild));
//   start = d3.select(svg.firstChild).attr("transform", transform);
//   end.selectAll(".array").each(function () {
//     this.parentNode.appendChild(this);
//   }); // mask elements

//   var startNodes = start.datum().nodes,
//     startElements = startNodes.filter(function (d) {
//       return d.type === "element";
//     }),
//     endNodes = end.datum().nodes,
//     endGroups = endNodes.filter(function (d) {
//       return d.type === "array";
//     });

//   resetAll();

//   return event;

//   function resetAll() {
//     start.style("display", "none").call(reset);
//     end.style("display", null).call(reset);
//     play.style("display", null);
//     event.reset();
//   }

//   function animation() {
//     start.call(fadeIn, 150);
//     end.style("display", "none");
//     play.style("display", "none");
//     setTimeout(transition1, 1250);
//     event.start();
//   }

//   function transition1() {
//     var t = start.transition()
//       .duration(1000 + (startElements.length - 1) * 50)
//       .each("end", transition2);

//     t.selectAll(".selection,.array,.link")
//       .duration(0)
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     t.selectAll(".element")
//       .duration(500)
//       .delay(function (d, i) {
//         return 500 + i * 50;
//       })
//       .attr("transform", function (d, i) {
//         return "translate(" + (d.depth - 1) * step + "," + (endGroups[i].x - offset) + ")";
//       })
//       .attr("class", "array")
//       .select("rect")
//       .attr("width", function (d, i) {
//         return endGroups[i].width;
//       });

//     event.middle();
//   }

//   function transition2() {
//     end.style("display", null)
//       .selectAll(".element,.to-element")
//       .style("display", "none");

//     end.selectAll(".selection,.to-array,.array")
//       .call(fadeIn);

//     end.transition()
//       .duration(500)
//       .each("end", transition3);

//     event.end();
//   }

//   function transition3() {
//     start.style("display", "none");

//     end.selectAll(".element")
//       .style("display", null)
//       .attr("transform", function (d) {
//         return "translate(" + d.parent.depth * step + "," + d.parent.x + ")";
//       })
//       .transition()
//       .duration(500)
//       .delay(function (d, i) {
//         return i * 50;
//       })
//       .attr("transform", function (d) {
//         return "translate(" + d.depth * step + "," + d.x + ")";
//       });

//     end.selectAll(".to-element")
//       .style("display", null)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d, i) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }))
//       .transition()
//       .duration(500)
//       .delay(function (d, i) {
//         return i * 50;
//       })
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d, i) {
//           return {
//             y: d.target.depth * step,
//             x: d.target.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     end.transition()
//       .duration(2000)
//       .each("end", resetAll);
//   }
// }

// function updateAnimation(leftRoot, rightRoot, endRoot, outerHeight) {
//   var start = tree(leftRoot, rightRoot, outerHeight),
//     left = d3.select(start.node().firstChild),
//     right = d3.select(left.node().nextSibling),
//     end = tree(endRoot, outerHeight).remove(),
//     height = +start.attr("height");

//   end = d3.select(start.node().appendChild(end.node().firstChild));
//   left.selectAll(".element").each(function () {
//     this.parentNode.appendChild(this);
//   }); // mask keys
//   right.selectAll(".datum").each(function () {
//     this.parentNode.appendChild(this);
//   }); // mask keys
//   start.node().appendChild(left.node());
//   start.node().appendChild(right.node());

//   var leftKeys = left.datum().nodes.filter(function (d) {
//       return d.type === "key";
//     }),
//     rightKeys = right.datum().nodes.filter(function (d) {
//       return d.type === "key";
//     }),
//     endElements = end.datum().nodes.filter(function (d) {
//       return d.parent && d.parent.type === "array";
//     });

//   leftKeys.forEach(function (l, i) {
//     if ("join" in l) {
//       rightKeys[i + l.join].joined = true;
//       endElements[i + l.join].start = l.parent;
//       l.parent.end = endElements[i + l.join];
//     }
//   });

//   leftKeys.forEach(function (l, i) {
//     if (!("join" in l)) endElements.some(function (e) {
//       if (!e.start) {
//         e.start = l.parent;
//         l.parent.end = e;
//         return true;
//       }
//     });
//   });

//   var play = start.append("g")
//     .attr("class", "play");

//   play.append("circle")
//     .attr("r", 45)
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")");

//   play.append("path")
//     .attr("d", "M-22,-30l60,30l-60,30z")
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")scale(.7)");

//   play.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mousedown", function () {
//       play.classed("mousedown", true);
//       d3.select(window).on("mouseup", function () {
//         play.classed("mousedown", false);
//       });
//     })
//     .on("click", function () {
//       resetAll();
//       animation();
//     });

//   resetAll();

//   function resetAll() {
//     play.style("display", null);
//     left.style("display", "none").call(reset);
//     right.style("display", "none").call(reset);
//     right.selectAll(".key").classed("joined", function (d) {
//       return d.joined;
//     });
//     right.selectAll(".datum").classed("joined", function (d) {
//       return d.children[0].joined;
//     });
//     right.selectAll(".to-key").classed("joined", function (d) {
//       return d.target.joined;
//     });
//     end.call(reset);
//   }

//   function animation() {
//     play.style("display", "none");
//     end.style("display", "none");
//     left.call(fadeIn);
//     right.call(fadeIn);
//     setTimeout(transition1, 1250);
//   }

//   function transition1() {
//     left.selectAll(".key").filter(function (d) {
//         return !("join" in d);
//       })
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     left.selectAll(".to-key").filter(function (d) {
//         return !("join" in d.target);
//       })
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     left.selectAll(".element").filter(function (d) {
//         return !("join" in d.children[0]);
//       })
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     left.selectAll(".to-element").filter(function (d) {
//         return !("join" in d.target.children[0]);
//       })
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     right.selectAll(".link > :not(.joined),.node > :not(.joined)")
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     end.style("display", null);

//     end.selectAll(".datum,.to-datum")
//       .style("display", "none");

//     end.selectAll(".element,.null")
//       .attr("transform", function (d, i) {
//         return "translate(" + d.depth * step + "," + d.start.x + ")";
//       });

//     end.selectAll(".to-element,.to-null")
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: d.target.depth * step,
//             x: d.target.start.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     setTimeout(transition2, 500);
//   }

//   function transition2() {
//     left.selectAll(".element").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + d.depth * step + "," + d.end.x + ")";
//       });

//     left.selectAll(".key").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + d.depth * step + "," + d.parent.end.x + ")";
//       });

//     left.selectAll(".to-element").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: d.target.depth * step,
//             x: d.target.end.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     left.selectAll(".to-key").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.end.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: d.target.depth * step,
//             x: d.target.parent.end.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     left.selectAll(".join").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.width,
//             x: 0
//           };
//         })
//         .target(function (d) {
//           return {
//             y: 88,
//             x: 0
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     end.selectAll(".element,.null").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + d.depth * step + "," + d.x + ")";
//       });

//     end.selectAll(".to-element,.to-null").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.source.depth * step + d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: d.target.depth * step,
//             x: d.target.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     setTimeout(transition3, 500);
//   }

//   function transition3() {
//     var offset = 12;

//     left.selectAll(".join").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: d.width,
//             x: 0
//           };
//         })
//         .target(function (d) {
//           return {
//             y: d.width,
//             x: 0
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     left.selectAll(".to-key")
//       .attr("class", "from-element to-datum");

//     right.selectAll(".to-key").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: (d.source.depth - 2) * step + offset - d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: (d.source.depth - 2) * step + offset - d.source.width,
//             x: d.source.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     right.selectAll(".key").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + ((d.depth - 1) * step + offset) + "," + d.x + ")";
//       });

//     right.selectAll(".datum").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + ((d.depth - 2) * step + offset) + "," + d.x + ")";
//       });

//     setTimeout(resetAll, 2000);
//   }
// }

// function exitAnimation(leftRoot, rightRoot, endRoot, outerHeight) {
//   var start = tree(leftRoot, rightRoot, outerHeight),
//     left = d3.select(start.node().firstChild),
//     right = d3.select(left.node().nextSibling),
//     end = tree(endRoot, outerHeight).remove(),
//     height = +start.attr("height");

//   end = d3.select(start.node().appendChild(end.node().firstChild));
//   start.node().appendChild(left.node());
//   start.node().appendChild(right.node());

//   var play = start.append("g")
//     .attr("class", "play");

//   play.append("circle")
//     .attr("r", 45)
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")");

//   play.append("path")
//     .attr("d", "M-22,-30l60,30l-60,30z")
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")scale(.7)");

//   play.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mousedown", function () {
//       play.classed("mousedown", true);
//       d3.select(window).on("mouseup", function () {
//         play.classed("mousedown", false);
//       });
//     })
//     .on("click", function () {
//       resetAll();
//       animation();
//     });

//   resetAll();

//   function resetAll() {
//     play.style("display", null);
//     left.style("display", "none").call(reset);
//     right.style("display", "none").call(reset);
//     end.call(reset);
//   }

//   function animation() {
//     play.style("display", "none");
//     end.style("display", "none");
//     left.call(fadeIn);
//     right.call(fadeIn);
//     setTimeout(transition1, 1250);
//   }

//   function transition1() {
//     end.style("display", null);

//     left
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     right
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     setTimeout(resetAll, 2000);
//   }
// }

// function enterAnimation(leftRoot, rightRoot, endRoot, outerHeight) {
//   var start = tree(leftRoot, rightRoot, outerHeight),
//     left = d3.select(start.node().firstChild),
//     right = d3.select(left.node().nextSibling),
//     end = tree(endRoot, outerHeight).remove(),
//     height = +start.attr("height");

//   start.node().appendChild(left.node());
//   start.node().appendChild(right.node());
//   end = d3.select(start.node().appendChild(end.node().firstChild));

//   var leftKeys = left.datum().nodes.filter(function (d) {
//       return d.type === "key";
//     }),
//     rightKeys = right.datum().nodes.filter(function (d) {
//       return d.type === "key";
//     });

//   leftKeys.forEach(function (l, i) {
//     if ("join" in l) {
//       rightKeys[i + l.join].joined = true;
//     }
//   });

//   var play = start.append("g")
//     .attr("class", "play");

//   play.append("circle")
//     .attr("r", 45)
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")");

//   play.append("path")
//     .attr("d", "M-22,-30l60,30l-60,30z")
//     .attr("transform", "translate(" + (margin.left + width / 2) + "," + height / 2 + ")scale(.7)");

//   play.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mousedown", function () {
//       play.classed("mousedown", true);
//       d3.select(window).on("mouseup", function () {
//         play.classed("mousedown", false);
//       });
//     })
//     .on("click", function () {
//       resetAll();
//       animation();
//     });

//   resetAll();

//   function resetAll() {
//     play.style("display", null);
//     left.style("display", "none").call(reset);
//     right.style("display", "none").call(reset);
//     right.selectAll(".key").classed("joined", function (d) {
//       return d.joined;
//     });
//     right.selectAll(".datum").classed("joined", function (d) {
//       return d.children[0].joined;
//     });
//     right.selectAll(".to-key").classed("joined", function (d) {
//       return d.target.joined;
//     });
//     end.call(reset);
//   }

//   function animation() {
//     play.style("display", "none");
//     end.style("display", "none");
//     left.call(fadeIn);
//     right.call(fadeIn);
//     setTimeout(transition1, 1250);
//   }

//   function transition1() {
//     end.style("display", null);

//     end.selectAll(".element,.datum,.to-datum")
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     left.selectAll(".element,.to-element,.key,.to-key")
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     right.selectAll(".array,.to-array,.data,.to-function,.to-datum,.joined")
//       .style("stroke-opacity", 0)
//       .style("fill-opacity", 0);

//     setTimeout(transition2, 750);
//   }

//   function transition2() {
//     var offset = 12;

//     right.selectAll(".key:not(.joined)").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + ((d.depth - 2) * step + offset) + "," + d.x + ")";
//       });

//     right.selectAll(".datum:not(.joined)").transition()
//       .duration(500)
//       .attr("transform", function (d, i) {
//         return "translate(" + ((d.depth - 2) * step + offset) + "," + d.x + ")";
//       });

//     right.selectAll(".to-key:not(.joined)").transition()
//       .duration(500)
//       .attr("d", d3.svg.diagonal()
//         .source(function (d) {
//           return {
//             y: (d.source.depth - 2) * step + offset - d.source.width,
//             x: d.source.x
//           };
//         })
//         .target(function (d) {
//           return {
//             y: (d.source.depth - 3) * step + offset - d.source.width,
//             x: d.source.x
//           };
//         })
//         .projection(function (d) {
//           return [d.y, d.x];
//         }));

//     setTimeout(transition3, 500);
//   }

//   function transition3() {
//     right.selectAll(".to-key:not(.joined)")
//       .style("stroke-opacity", 0);

//     end.selectAll(".element,.datum,.to-datum")
//       .style("stroke-opacity", 1)
//       .style("fill-opacity", 1);

//     setTimeout(resetAll, 2000);
//   }
// }

// function fadeIn(selection, delay) {
//   selection
//     .style("display", null)
//     .style("stroke-opacity", 0)
//     .style("fill-opacity", 0)
//     .transition()
//     .duration(delay || 0)
//     .style("stroke-opacity", 1)
//     .style("fill-opacity", 1);
// }