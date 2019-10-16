var GlobalYear, Globalval1;
function GlobalvalueUpdate(year2, val2) {
  GlobalYear = year2;
  Globalval1 = val2;
}

function makeResponsive(GlobalYear, Globalval1) {
  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  /////////////////////////////////////////////////BEGIN2
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
    data,
    circlesGroup,
    xLinearScale,
    chosenXAxis,
    yLinearScale,
    chosenYAxis
  ) {
    console.log(data);
    console.log(chosenYAxis);
    console.log(data.map(d => d[chosenYAxis]));
    circlesGroup
      .transition()
      .duration(1000)
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      // .attr("fill", (d, i) => {
      //   // console.log(d[chosenYAxis]);
      //   if (yLinearScale(d[chosenYAxis]) === height) {
      //     console.log("none");
      //     return "none";
      //   } else {
      //     return d3.schemeCategory10[i % 10];
      //   }
      // })
      .attr("opacity", (d, i) => {
        // console.log(d[chosenYAxis]);
        if (yLinearScale(d[chosenYAxis]) === height) {
          return 0;
        } else {
          return 1;
        }
      });

    return circlesGroup;
  }
  // function used for updating the text inside circles with a transition to new circles

  function rendertext(
    data,
    textGroup,
    xLinearScale,
    chosenXAxis,
    yLinearScale,
    chosenYAxis
  ) {
    console.log(data);
    textGroup
      .transition()
      .duration(1000)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => {
        yLinearScale(d[chosenYAxis]);
      });

    return textGroup;
  }

  function update_continent(continent) {
    console.log(continent);
    var sect = document.getElementById("year");
    var year = sect.options[sect.selectedIndex].value;
    plot(year, continent);
  }

  function update_year(year) {
    console.log(year);
    var sect = document.getElementById("continent");
    var continent = sect.options[sect.selectedIndex].value;
    plot(year, continent);
  }

  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    if (
      chosenXAxis === "Totallife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Total"
    ) {
      //if (chosenXAxis === "Totallife"+GlobalYear && chosenYAxis === "W2010Total")
      console.log(Globalval1 + GlobalYear + "Total");
      var labelX = "Total Life Expectancy: ";
      var labelY = "Total Sanitation:";
      if (Globalval1 === "W") {
        labelY = "Total/Water: ";
      } else {
        labelY = "Total/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Malelife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Total"
    ) {
      var labelX = "Male: ";
      var labelY = "Total Sanitation: ";
      if (Globalval1 === "W") {
        labelY = "Total/Water: ";
      } else {
        labelY = "Total/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Femalelife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Total"
    ) {
      var labelX = "Female: ";
      var labelY = "Total Sanitation: ";
      if (Globalval1 === "W") {
        labelY = "Total/Water: ";
      } else {
        labelY = "Total/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Totallife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Rural"
    ) {
      var labelX = "Total Life Expectancy: ";
      var labelY = "Rural: ";
      if (Globalval1 === "W") {
        labelY = "Rural/Water: ";
      } else {
        labelY = "Rural/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Malelife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Rural"
    ) {
      var labelX = "Male: ";
      var labelY = "Rural: ";
      if (Globalval1 === "W") {
        labelY = "Rural/Water: ";
      } else {
        labelY = "Rural/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Femalelife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Rural"
    ) {
      var labelX = "Female: ";
      var labelY = "Rural: ";
      if (Globalval1 === "W") {
        labelY = "Rural/Water: ";
      } else {
        labelY = "Rural/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Totallife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Urban"
    ) {
      var labelX = "Total Life Expectancy: ";
      var labelY = "Urban: ";
      if (Globalval1 === "W") {
        labelY = "Urban/Water : ";
      } else {
        labelY = "Urban/Sanitation: ";
      }
    } else if (
      chosenXAxis === "Malelife" + GlobalYear &&
      chosenYAxis === Globalval1 + GlobalYear + "Urban"
    ) {
      var labelX = "Male: ";
      var labelY = "Urban: ";
      if (Globalval1 === "W") {
        labelY = "Urban/Water: ";
      } else {
        labelY = "Urban/Sanitation: ";
      }
    } //chosenXAxis === "Femalelife"+GlobalYear && chosenYAxis === Globalval1+GlobalYear+"Urban";
    else {
      var labelX = "Female: ";
      var labelY = "Urban: ";
      if (Globalval1 === "W") {
        labelY = "Urban/Water: ";
      } else {
        labelY = "Urban/Sanitation: ";
      }
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

  //d3.csv("assets/data/" + GlobalYear + ".csv")
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
        data.W2010Rural = +data.W2010Rural;
        data.W2010Urban = +data.W2010Urban;
        data.W2010Total = +data.W2010Total;
        data.S2000Rural = +data.S2000Rural;
        data.S2000Urban = +data.S2000Urban;
        data.S2000Total = +data.S2000Total;
        data.W2000Rural = +data.W2000Rural;
        data.W2000Urban = +data.W2000Urban;
        data.W2000Total = +data.W2000Total;
      });
      ShowHide();
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
      var myColor = d3
        .scaleOrdinal()
        // .scaleSequential()
        .domain(countrydata)
        //.interpolator(d3.interpolateRdYlGn);
        .range(d3.schemeCategory10);
      //.range(d3.schemeRdYlGn[(3, 11)]);
      var circlesGroup = chartGroup
        .selectAll("circle")
        .data(countrydata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 14)
        //.attr("class", "countryCircle")
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);
      //.attr("fill", (d, i) => {
      //   console.log(d);
      //   console.log(chosenYAxis);
      //   if (d[chosenYAxis] === 0) return "none";
      //   return d3.schemeCategory10[i % 10];
      // }
      // });

      // .attr("fill", (d, i) => d3.interpolateRdYlGn[i % 10]);

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
        .attr("value", "Totallife" + GlobalYear) // value to grab for event listener
        .classed("active", true)
        .text("Total Life Expectancy at birth (years)");

      var MaleLabel = xLabelsGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 50)
        .attr("value", "Malelife" + GlobalYear) // value to grab for event listener
        .classed("inactive", true)
        .text("Male Life expectancy at birth (years)");

      var FemaleLabel = xLabelsGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 75)
        .attr("value", "Femalelife" + GlobalYear) // value to grab for event listener
        .classed("inactive", true)
        .text("Female Life expectancy at birth (years)");

      var RuralLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 0)
        .attr("value", Globalval1 + GlobalYear + "Rural") // value to grab for event listener
        .classed("active", true)
        .text("Rural (%)");

      var UrbanLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 25)
        .attr("value", Globalval1 + GlobalYear + "Urban") // value to grab for event listener
        .classed("inactive", true)
        .text("Urban (%)");

      var TotalLabel = yLabelsGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 50)
        .attr("value", Globalval1 + GlobalYear + "Total") // value to grab for event listener
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
          console.log(countrydata);
          console.log(chosenXAxis);
          console.log(chosenYAxis);
          console.log(countrydata.map(d => d[chosenXAxis]));
          console.log(countrydata.map(d => d[chosenYAxis]));
          xLinearScale = xScale(countrydata, chosenXAxis);
          // yLinearScale = yScale(countrydata, chosenYAxis);

          // updates x axis with transition
          xAxis = renderXAxis(xLinearScale, xAxis);
          // yAxis = renderYAxis(yLinearScale, yAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(
            countrydata,
            circlesGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          textGroup = rendertext(
            countrydata,
            textGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "Totallife" + GlobalYear) {
            totallifeLabel.classed("active", true).classed("inactive", false);
            MaleLabel.classed("active", false).classed("inactive", true);
            FemaleLabel.classed("active", false).classed("inactive", true);
          } else if (chosenXAxis === "Malelife" + GlobalYear) {
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
            countrydata,
            circlesGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          textGroup = rendertext(
            countrydata,
            textGroup,
            xLinearScale,
            chosenXAxis,
            yLinearScale,
            chosenYAxis
          );
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenYAxis === Globalval1 + GlobalYear + "Total") {
            RuralLabel.classed("active", false).classed("inactive", true);
            UrbanLabel.classed("active", false).classed("inactive", true);
            TotalLabel.classed("active", true).classed("inactive", false);
          } else if (chosenYAxis === Globalval1 + GlobalYear + "Rural") {
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
//var yr = document.getElementById("years");
// makeResponsive("2016", "W");

// When the browser window is resized, makeResponsive() is called.
// d3.select(window).on("resize", makeResponsive);

function ShowHide() {
  $("#info1").fadeIn();
  $("#info1").fadeIn("slow");
  $("#info1").fadeIn(3000);
  $("#info1").fadeOut();
  $("#info1").fadeOut("slow");
  $("#info1").fadeOut(3000);
}
