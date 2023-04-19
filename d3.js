/* scatter */

 // Generate random data points
var data = d3.range(100).map(function() {
    return {
        x: Math.random() * 500,
        y: Math.random() * 500
    };
});

var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

 var xScale = d3.scaleLinear().domain([0, 500]).range([0, width]),
    yScale = d3.scaleLinear().domain([0, 500]).range([height, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  svg.append('text')
.attr('x', width/2 + 100)
.attr('y', 100)
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-size', 20)
.text('ScatterPlot');

svg.append('text')
.attr('x', width/2 + 100)
.attr('y', height - 15 + 150)
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-size', 12)
.text('X-axis');

svg.append('text')
.attr('text-anchor', 'middle')
.attr('transform', 'translate(60,' + height + ')rotate(-90)')
.style('font-family', 'Helvetica')
.style('font-size', 12)
.text('Y-axis');

g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xScale));

g.append("g")
 .call(d3.axisLeft(yScale));

 svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
.attr("cx", function (d) { return xScale(d.x); } )
.attr("cy", function (d) { return yScale(d.y); } )
.attr("r", 2.5)
.attr("transform", "translate(" + 100 + "," + 100 + ")")
.style("fill", "#CC0000");




/* Pie cart 
function main(){
  var svg = d3.select ('svg'),
  width = svg.attr('width'),
  height= svg.attr('height'),
  radius = Math.min(width,height) /2;
  var g = svg.append('g')
        .attr('transform','translate(' + width/2 + ',' + height/2 + ')');
  var color = d3.scaleOrdinal(['#e40303','#ff8c00','#ffed00','#004dff','#750787'])
  var pie = d3.pie().value(function(d){
    return d.percent
  })
  var path = d3.arc()
        .outerRadius(radius -10)
        .innerRadius(0);
  var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);
  d3.csv('titanic.csv').then(function(data){
    
    var datagrouped = d3.group (data, d => d.Age / 10)
    console.log (datagrouped)     
    data.forEach(function(d){
      d.Age = +d.Age
    });
    var pieData = d3.nest()
        .key(function(d){
          return d.Age;
        })
        .rollup(function(leaves){
          return leaves.length;
        })
        .entries(data);
      var pie = d3.pie()
        .value(function(d){
          return d.value;
        })
      var pieChart = d3.select("#pie-chart")
        .append("g")
        .attr("transform", "translate(250, 250)");

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(100);

      pieChart.selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
          return d3.schemeCategory10[i];
        });
});*/
  d3.csv("titanic.csv").then(function(data) {
  // Convert ages to numbers
  data.forEach(function(d) {
    d.Age = +d.Age;
  });
  var AgeGroups = d3.range(0, 100, 10);
  var AgeData = AgeGroups.map(function(d) {
    return {
      AgeRange: d + "-" + (d + 10),
      count: 0
    };
  });
  data.forEach(function(d) {
    AgeData.forEach(function(a) {
      if (d.Age >= a.AgeRange.split("-")[0] && d.Age < a.AgeRange.split("-")[1]) {
        a.count++;
      }
    });
  });
  console.log(AgeData)
  var pie = d3.pie()
    .value(function(d) { return d.count; });
  var width = 1000;
  var height = 1000;
  var radius = Math.min(width, height) / 2;
  var colors = d3.scaleOrdinal(d3.schemeCategory10);
  var svg = d3.select("#pieChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
  var pieChart = svg.selectAll("pieSlice")
    .data(pie(AgeData))
    .enter()
    .append("g");
  pieChart.append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) { return colors(i); });
  pieChart.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".15em")
    .text(function(d) { return d.data.AgeRange});
});

