function makeResponsive() {
  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var svgHeight = 600;
  var svgWidth = 950;

  var margin = {
    top: 15,
    right: 40,
    bottom: 120,
    left: 150
  };

  var width = svgWidth - margin.right - margin.left;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Initial Params
  var chosenXAxis = "Life Expectancy";
  var chosenYAxis = "Water & Sanitation";

  // function used for updating x-scale var upon click on axis label
  function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, d => d[chosenXAxis]) * 0.9,
        d3.max(data, d => d[chosenXAxis]) * 1.1
      ])
      .range([0, width]);

    return xLinearScale;
  }
  // function used for updating y-scale var upon click on yaxis label
  function yScale(data, chosenYAxis) {
    //create scales
    var yLinearScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, d => d[chosenYAxis]) * 0.9,
        d3.max(data, d => d[chosenYAxis]) * 1.1
      ])
      .range([height, 0]);

    return yLinearScale;
  }

  // function used for updating xAxis var upon click on axis label
  function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis
      .transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;
  }

  // function used for updating yAxis var upon click on axis label
  function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis
      .transition()
      .duration(1000)
      .call(leftAxis);

    return yAxis;
  }
  // function used for updating circles group with a transition to new circles

  function renderCircles(
    circlesGroup,
    xLinearScale,
    chosenXAxis,
    yLinearScale,
    chosenYAxis
  ) {
    circlesGroup
      .transition()
      .duration(1000)
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]));

    return circlesGroup;
  }
  // function used for updating the text inside circles with a transition to new circles

  function rendertext(
    textGroup,
    xLinearScale,
    chosenXAxis,
    yLinearScale,
    chosenYAxis
  ) {
    textGroup
      .transition()
      .duration(1000)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]));

    return textGroup;
  }

  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    if (chosenXAxis === "Totallife2016" && chosenYAxis === "S2016Total") {
      var labelX = "Total Life Expectancy: ";
      var labelY = "Total Sanitation:";
    } else if (chosenXAxis === "Malelife2016" && chosenYAxis === "S2016Total") {
      var labelX = "Male: ";
      var labelY = "Total Sanitation: ";
    } else if (
      chosenXAxis === "Femalelife2016" &&
      chosenYAxis === "S2016Total"
    ) {
      var labelX = "Female: ";
      var labelY = "Total Sanitation: ";
    } else if (
      chosenXAxis === "Totallife2016" &&
      chosenYAxis === "S2016Rural"
    ) {
      var labelX = "Total Life Expectancy: ";
      var labelY = "Rural: ";
    } else if (chosenXAxis === "Malelife2016" && chosenYAxis === "S2016Rural") {
      var labelX = "Male: ";
      var labelY = "Rural: ";
    } else if (
      chosenXAxis === "Femalelife2016" &&
      chosenYAxis === "S2016Rural"
    ) {
      var labelX = "Female: ";
      var labelY = "Rural: ";
    } else if (
      chosenXAxis === "Totallife2016" &&
      chosenYAxis === "S2016Urban"
    ) {
      var labelX = "Total Life Expectancy: ";
      var labelY = "Urban: ";
    } else if (chosenXAxis === "Malelife2016" && chosenYAxis === "S2016Urban") {
      var labelX = "Male: ";
      var labelY = "Urban: ";
    } else chosenXAxis === "Femalelife2016" && chosenYAxis === "S2016Urban";
    {
      var labelX = "Female: ";
      var labelY = "Urban: ";
    }

    var toolTip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return `${d.Country}<br>${labelX}${d[chosenXAxis]}<br>${labelY}${d[chosenYAxis]}`;
      });

    circlesGroup.call(toolTip);

    circlesGroup
      .on("mouseover", function(data) {
        toolTip.show(data);
      })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    return circlesGroup;
  }

  // Retrieve data from the CSV file and execute everything below

  d3.csv("assets/data/data.csv")
    .then(function(countrydata, err) {
      if (err) throw err;

      //d3.select("#mydropdown")
      //.data(countrydata)
      //.enter()
      //.append("option")
      //.attr("value", d => d.Totallife)
      //.text(d => d.Totallife);

      console.log(countrydata);
      // parse data
      countrydata.forEach(function(data) {
        data.TotalLife2000 = +data.TotalLife2000;
        data.Malelife2000 = +data.Malelife2000;
        data.Femalelife2000 = +data.Femalelife2000;
        data.Totallife2010 = +data.Totallife2010;
        data.Malelife2010 = +data.Malelife2010;
        data.Femalelife2010 = +data.Femalelife2010;
        data.Totallife2016 = +data.Totallife2016;
        data.Malelife2016 = +data.Malelife2016;
        data.Femalelife2016 = +data.Femalelife2016;
        data.S2016Rural = +data.S2016Rural;
        data.S2016Urban = +data.S2016Urban;
        data.S2016Total = +data.S2016Total;
        data.W2016Rural = +data.W2016Rural;
        data.W2016Urban = +data.W2016Urban;
        data.W2016Total = +data.W2016Total;
        data.S2010Rural = +data.S2010Rural;
        data.S2010Urban = +data.S2010Urban;
        data.S2010Total = +data.S2010Total;
        data.W2010Rural = +data.W2010Urban;
        data.W2010Urban = +data.W2010Urban;
        data.W2010Total = +data.W2010Total;
        data.S2000Rural = +data.S2000Rural;
        data.S2000Urban = +data.S2000Urban;
        data.S2000Total = +data.S2000Total;
        data.W2000Rural = +data.W2000Rural;
        data.W2000Urban = +data.W2000Urban;
        data.W2000Total = +data.W2000Total;
      });

      // Create x scale function
      var xLinearScale = xScale(countrydata, chosenXAxis);

      // Create y scale function
      var yLinearScale = yScale(countrydata, chosenYAxis);

      // Create initial axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // append x axis
      var xAxis = chartGroup
        .append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      // append y axis
      var yAxis = chartGroup
        .append("g")
        .classed("y-axis", true)
        .call(leftAxis);

      // append initial circles
      var circlesGroup = chartGroup
        .selectAll("circle")
        .data(countrydata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 14)
        .attr("class", "countryCircle");

      // append texts inside circles
      var textGroup = chartGroup
        .selectAll("div")
        .data(countrydata)
        .enter()
        .append("text")
        .text(function(d) {
          return d.abbr;
        })
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("dy", "0.3em")
        //.attr("dx","-0.7em")
        .attr("class", "countryText")
        //.attr("font-family", "sans-serif")
        .attr("font-weight", "500");
      //.attr("font-size", "14px");

      // Create group for  3 x-axis labels
      var xLabelsGroup = chartGroup
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

      // Create group for  3 y-axis labels
      var yLabelsGroup = chartGroup
        .append("g")
        .attr("transform", `translate(-90, ${height / 2})`);

      var totallifeLabel = xLabelsGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 25)
        .attr("value", "Totallife2016") // value to grab for event listener
        .classed("active", true)
        .text("Total Life Expectancy at birth (years)");

      var MaleLabel = xLabelsGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 50)
        .attr("value", "Malelife2016") // value to grab for event listener
        .classed("inactive", true)
        .text("Male Life expectancy at birth (years)");

      var FemaleLabel = xLabelsGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 75)
        .attr("value", "Femalelife2016") // value to grab for event listener
        .classed("inactive", true)
        .text("Female Life expectancy at birth (years)");

      var RuralLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 0)
        .attr("value", "S2016Rural") // value to grab for event listener
        .classed("active", true)
        .text("Rural (%)");

      var UrbanLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 25)
        .attr("value", "S2016Urban") // value to grab for event listener
        .classed("inactive", true)
        .text("Urban (%)");

      var TotalLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 50)
        .attr("value", "S2016Total") // value to grab for event listener
        .classed("inactive", true)
        .text("Total (%)");

      // updateToolTip for the current circles
      var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // x axis labels event listener
      xLabelsGroup.selectAll("text").on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
          // replaces chosenXAxis with value
          chosenXAxis = value;

          // console.log(chosenXAxis)

          // updates x scale for new data
          xLinearScale = xScale(countrydata, chosenXAxis);
          // yLinearScale = yScale(countrydata, chosenYAxis);

          // updates x axis with transition
          xAxis = renderXAxis(xLinearScale, xAxis);
          // yAxis = renderYAxis(yLinearScale, yAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(
            circlesGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          textGroup = rendertext(
            textGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "Totallife2016") {
            totallifeLabel.classed("active", true).classed("inactive", false);
            MaleLabel.classed("active", false).classed("inactive", true);
            FemaleLabel.classed("active", false).classed("inactive", true);
          } else if (chosenXAxis === "Malelife2016") {
            totallifeLabel.classed("active", false).classed("inactive", true);
            MaleLabel.classed("active", true).classed("inactive", false);
            FemaleLabel.classed("active", false).classed("inactive", true);
          } else {
            totallifeLabel.classed("active", false).classed("inactive", true);
            MaleLabel.classed("active", false).classed("inactive", true);
            FemaleLabel.classed("active", true).classed("inactive", false);
          }
        }
      });

      // y axis labels event listener
      yLabelsGroup.selectAll("text").on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {
          // replaces chosenYAxis with value
          chosenYAxis = value;

          // console.log(chosenYAxis)

          // updates y scale for new data
          // xLinearScale = xScale(countrydata, chosenXAxis);
          yLinearScale = yScale(countrydata, chosenYAxis);

          // updates y axis with transition
          //xAxis = renderXAxis(xLinearScale, xAxis);
          yAxis = renderYAxis(yLinearScale, yAxis);

          // updates circles with new y values
          circlesGroup = renderCircles(
            circlesGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          textGroup = rendertext(
            textGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenYAxis === "S2016Total") {
            RuralLabel.classed("active", false).classed("inactive", true);
            UrbanLabel.classed("active", false).classed("inactive", true);
            TotalLabel.classed("active", true).classed("inactive", false);
          } else if (chosenYAxis === "S2016Rural") {
            RuralLabel.classed("active", true).classed("inactive", false);
            UrbanLabel.classed("active", false).classed("inactive", true);
            TotalLabel.classed("active", false).classed("inactive", true);
          } else {
            RuralLabel.classed("active", false).classed("inactive", true);
            UrbanLabel.classed("active", true).classed("inactive", false);
            TotalLabel.classed("active", false).classed("inactive", true);
          }
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
