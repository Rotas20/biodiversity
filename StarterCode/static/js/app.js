// Horizontal Bar Chart
d3.json("samples.json").then(function(data) {
    //console.log(data[0]);
    var metadata = data.metadata;
    console.log(metadata);
    var sortedBysamplevals = metadata.sort((a, b) => b.sample_values - a.sample_values);

    
    // Slice the first 10 objects for plotting
    slicedData = sortedBysamplevals.slice(0, 10);

        var trace1 = {
            x: samples_values,
            y: samples.otu_ids,
            orientation: 'h',
            marker: {
            color: 'rgba(55,128,191,0.6)',
            width: 1
            },
            type: 'bar',
            orientation: "h",
            text: samples.otu_labels
        };
        

        var data = [trace1];
        
        var layout = {
            title: 'Top Operational Taxonomic Units (OTUs)'
        
        };
        
        Plotly.newPlot('bar', data, layout);

        // Use otu_ids for the x values.
        // Use sample_values for the y values
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.

        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker: {
            color: samples.otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: [40, 60, 80, 100]
            }
        };
        
        var data = [trace1];
        
        var layout = {
            title: 'Bubble Chart OTU',
            showlegend: false,
            height: 600,
            width: 600,
            text: samples.otu_labels

        };
        
        Plotly.newPlot('bubble', data, layout);

 });