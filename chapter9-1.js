
var w = 600
var h = 250 
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25]

var xScale = d3.scaleBand().domain(d3.range(dataset.length)).rangeRound([0, w]).paddingInner(0.05) 
var yScale = d3.scaleLinear().domain([0, d3.max(dataset)]).range([0, h])

var svg = d3.select('body').append('svg') .attr('width', w).attr('height', h) 

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => { 
    return xScale(i) 
  })
  .attr("y", function(d) {
    return h - yScale(d);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', (d) => {
    return 'rgb(0, 0, ' + Math.round(d * 10) + ')'
  })

// create labels
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text((d) => {
    return d
  })
  .attr("text-anchor", "middle")
  .attr('x', (d, i) => {
    return xScale(i) + xScale.bandwidth() / 2
  })
  .attr('y', (d) => {
    return h - yScale(d) + 14
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')


dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13]
d3.select('p')
  .on('click', () => {
    svg.selectAll('rect')
      .data(dataset)
      .transition()
      .duration(1000)
      .attr('y', (d) => {
        return h - yScale(d)
      })
      .attr('height', (d) => {
        return yScale(d)
      })
      .attr('fill', (d) => {
        return 'rgb(0, 0, ' + Math.round(d * 10) + ')'
      })
    
    svg.selectAll('text')
      .data(dataset)
      .transition()
      .duration(1500)
      .text((d) => {
        return d
      })
      .attr('x', (d, i) => {
        return xScale(i) + xScale.bandwidth() / 2
      })
      .attr('y', (d) => {
        return h - yScale(d) + 14
      })
  })
