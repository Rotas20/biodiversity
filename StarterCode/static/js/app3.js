
d3.json("/data/samples.json").then((data) => {
    sample_vals = data.samples;
   
    var default_samp = sample_vals.filter(sample_vals => sample_vals.id == 940)
    var data_val = default_samp[0].sample_values.slice(0,10).reverse();


    function BuildGraphs (data) {
        var trace1 = {
            x: data_val,
            y: default_samp[0].otu_ids.slice(0,10).reverse().map(otu => `OTU ${otu}`),
            orientation: 'h',
            marker: {
            color: 'rgba(55,128,191,0.6)',
            width: 3
            },
            type: 'bar',
            orientation: "h",
            text: default_samp[0].otu_labels.slice(0,10).reverse()
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

        var trace2 = {
            x: sample_vals.otu_labels,
            y: sample_vals.sample_values,
            mode: 'markers',
            marker: {
            color: sample_vals.otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: [40, 60, 80, 100]
            }
        };
        
        var data = [trace2];
        
        var layout = {
            title: 'Bubble Chart OTU',
            showlegend: false,
            height: 600,
            width: 600,
            text: sample_vals.otu_labels,
            xaxis: {
                title: {
                text: 'OTU ID',
                },
            },

        };
        
        Plotly.newPlot('bubble', data, layout);

                        // metadata table
        

                        // var labels = Object.keys(data.metadata);

        
                        // var data = [{
                        //     lables: labels,
                        //     values: ,
                        //     type: 'table'
                        //   }];
                        
                        //   var layout = {
                        //     height: 600,
                        //     width: 800
                        //   };
                        
                        //   Plotly.newPlot("sample-metadata", data, layout);
                        // }
                        

    }
 

    function optionChanged () {
        const option_sel = d3.select("#selDataset").property("value");
        var selected_samp = sample_vals;


        if (option_sel) {
            var selected_samp = selected_samp.filter(otu => otu.id == option_sel)

            var trace1 = {
                x: selected_samp,
                y: selected_samp[0].otu_ids.slice(0,10).reverse().map(otu => `OTU ${otu}`),
                orientation: 'h',
                marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 3
                },
                type: 'bar',
                orientation: "h",
                text: selected_samp[0].otu_labels.slice(0,10).reverse()
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
    
            var trace2 = {
                x: selected_samp.otu_labels,
                y: selected_samp.sample_values,
                mode: 'markers',
                marker: {
                color: selected_samp.otu_ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
                }
            };
            
            var data = [trace2];
            
            var layout = {
                title: 'Bubble Chart OTU',
                showlegend: false,
                height: 600,
                width: 600,
                text: selected_samp.otu_labels,
                xaxis: {
                    title: {
                    text: 'OTU ID',
                    },
                },
    
            };
            
            Plotly.newPlot('bubble', data, layout);
    
                            // metadata table
            
    
                            // var labels = Object.keys(data.metadata);
    
            
                            // var data = [{
                            //     lables: labels,
                            //     values: ,
                            //     type: 'table'
                            //   }];
                            
                            //   var layout = {
                            //     height: 600,
                            //     width: 800
                            //   };
                            
                            //   Plotly.newPlot("sample-metadata", data, layout);
                            // }
                            
    
        }



        BuildGraphs(selected_samp);
    }

    d3.selectAll("#selDataset").on("change", optionChanged);

    BuildGraphs(sample_vals);


});