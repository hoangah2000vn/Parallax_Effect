var data = [
{"year":2014.0,"value":1.9,"value_hnd":7.3,"value_slv":3.7,"value_gt":2.6},
{"year":2015.0,"value":2.1125,"value_hnd":7.7,"value_slv":8.4,"value_gt":2.1},
{"year":2016.0,"value":1.9117647059,"value_hnd":5.8,"value_slv":7.6,"value_gt":2.1},
{"year":2017.0,"value":2.3470588235,"value_hnd":5.1,"value_slv":8.0,"value_gt":2.1},
{"year":2018.0,"value":2.11875,"value_hnd":4.6,"value_slv":6.8,"value_gt":1.8},
{"year":2019.0,"value":1.8625,"value_hnd":6.0,"value_slv":3.4,"value_gt":1.7},
{"year":2020.0,"value":1.5882352941,"value_hnd":4.5,"value_slv":2.2,"value_gt":1.3},
{"year":2021.0,"value":1.6482352941,"value_hnd":4.6,"value_slv":2.4,"value_gt":1.6}
]

var trendsText = {'value':'World','value_hnd': 'Honduras', 'value_slv': 'El Salvador', 'value_gt': 'Gutemala'};

// set the dimensions and margins of the graph
var margin = { top: 20, right: 80, bottom: 30, left: 50 },  
    svg1 = d3.select('#violenceSvg'),
    width = +svg1.attr('width') - margin.left - margin.right,
    height = +svg1.attr('height') - margin.top - margin.bottom;
var g = svg1.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(1),
    y = d3.scaleLinear().rangeRound([height, 0]),
    z = d3.scaleOrdinal(['#666662','#036888','#0D833C','#D2392A',]);

// define the line
var line = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y(d.total); });

// scale the range of the data
z.domain(d3.keys(data[0]).filter(function(key) {
  return key !== "year";
}));

var trends = z.domain().map(function(name) {
  return {
    name: name,
    values: data.map(function(d) {
      return {
        year: d.year,
        total: +d[name]
      };
    })
  };
});

x.domain(data.map(function(d) { return d.year; }));
y.domain([0, d3.max(trends, function(c) {
  return d3.max(c.values, function(v) {
    return v.total;
  });
})]);

// Draw the legend
var legend = g.selectAll('g')
  .data(trends)
  .enter()
  .append('g')
  .attr('class', 'legend');

legend.append('rect')
  .attr('x', width - 20)
  .attr('y', function(d, i) { return height / 2 - (i + 1) * 20; })
  .attr('width', 10)
  .attr('height', 10)
  .style('fill', function(d) { return z(d.name); });

legend.append('text')
  .attr('x', width - 8)
  .attr('y', function(d, i) { return height / 2 - (i + 1) * 20 + 10; })
  .text(function(d) { return trendsText[d.name]; });

// Draw the line
var trend = g.selectAll(".trend")
  .data(trends)
  .enter()
  .append("g")
  .attr("class", "trend");

trend.append("path")
  .attr("class", "line")
  .attr("d", function(d) { return line(d.values); })
  .style("stroke", function(d) { return z(d.name); });

// Draw the empty value for every point
var points = g.selectAll('.points')
  .data(trends)
  .enter()
  .append('g')
  .attr('class', 'points')
  .append('text');

// Draw the circle
trend
  .style("fill", "#FFF")
  .style("stroke", function(d) { return z(d.name); })
  .selectAll("circle.line")
  .data(function(d){ return d.values })
  .enter()
  .append("circle")
  .attr("r", 3)
  .style("stroke-width", 3)
  .attr("cx", function(d) { return x(d.year); })
  .attr("cy", function(d) { return y(d.total); });

// trend
//   .selectAll("circle.text")
//   .data(function(d){ return d.values })
//   .enter()
//   .append('text')
//   .attr('x', function(d) { return x(d.timescale) + 15; })
//   .attr('y', function(d) { return y(d.total); })
//   .text(function(d) { return d.total; });

// Draw the axis
g.append("g")
  .attr("class", "axis axis-x")
  .attr("transform", "translate(0, " + height + ")")
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis-y")
  .call(d3.axisLeft(y).ticks(10));

var focus = g.append('g')
  .attr('class', 'focus')
  .style('display', 'none');

focus.append('line')
  .attr('class', 'x-hover-line hover-line')
  .attr('y1' , 0)
  .attr('y2', height);

svg1.append('rect')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("class", "overlay")
  .attr("width", width)
  .attr("height", height)
  .on("mouseover", mouseover)
  .on("mouseout", mouseout)
  .on("mousemove", mousemove);

var timeScales = data.map(function(name) { return x(name.year); });

function mouseover() {
  focus.style("display", null);
  d3.selectAll('.points text').style("display", null);
}
function mouseout() {
  focus.style("display", "none");
  d3.selectAll('.points text').style("display", "none");
}
function mousemove() {
  var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
  var di = data[i-1];
  focus.attr("transform", "translate(" + x(di.year) + ",0)");
  d3.selectAll('.points text')
    .attr('x', function(d) { return x(di.year) + 15; })
    .attr('y', function(d) { return y(d.values[i-1].total); })
    .text(function(d) { return d.values[i-1].total; })
    .style('fill', function(d) { return z(d.name); });
}