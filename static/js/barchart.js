////////////////////////////////////////////////////////////////////////
//create bar
function populateBar(list) {
    //Create the Traces
    const n = 10
    var otuIds = list.map(rec => rec.otu_ids);
    var sampleVals = list.map(rec => rec.sample_values);
    var otuLabels = list.map(rec => rec.otu_labels);
  
    var xaxis = sampleVals.flat().slice(0, n) //adding flat() since there is a nested array
    var yaxis = otuIds.flat().map(id => `OTU ${id}`).slice(0, n) //appending a literal
    var text = otuLabels.flat().slice(0, n)
  
    // console.log(xaxis); //sanity check
    // console.log(yaxis); //sanity check
    // console.log(text) //sanity check
  
    var trace = {
      x: xaxis,
      y: yaxis,
      text: text,
      type: "bar",
      orientation: "h",
    };
  
    // Create the data array for the plot
    var data = [trace];
  
    // Define the plot layout
    var layout = {
      title: "Top Ten Bacteria Cultures Found",
      barmode: "stack",
      yaxis: { autorange: 'reversed' }
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
  }