    function buildTable (data_sample) {

        d3.json("./data/samples.json").then((data) => {
        
            var metadata = data.metadata;
            var meta = metadata.filter(sampleObj => sampleObj.id == data_sample);
        
        

            var table = d3.select("#sample-metadata");
            table.html("");
        
            Object.entries(meta[0]).forEach(([key, value]) => {
            table.append("h6").text(`${key.toUpperCase()}: ${value}`);
            });
        

        })
        
    }

    function buildGraphs (data_sample) {
        d3.json("./data/samples.json").then((data) => {
            
            sample_vals = data.samples;
            var sample_vals = sample_vals.filter(sampleObj => sampleObj.id == data_sample);
            var sample = sample_vals[0].sample_values.slice(0,10).reverse();
            otu_label_id = sample_vals[0].otu_ids.map(otu => `OTU ${otu}`)

            // Bar Chart
            var trace1 =  {
                    x: sample,
                    y: otu_label_id,
                    orientation: 'h',
                    marker: {
                    color: 'rgba(55,128,191,0.6)',
                    width: 3
                    },
                    type: 'bar',
                    orientation: "h",
                    text: sample_vals[0].otu_labels.slice(0,10).reverse()
                         };
            
            
            var data = [trace1];
            
            var layout = {
                title: 'Top 10 Bacteria Cultures Found'
            };
            
            Plotly.newPlot('bar', data, layout);

            // Bubble Chart 
                var trace2 = {
                    x: sample_vals[0].otu_ids,
                    y: sample_vals[0].sample_values,
                    mode: 'markers',
                    marker: {
                        color: sample_vals[0].otu_ids,
                        opacity: [1, 0.8, 0.6, 0.4],
                        size: sample.sample_values,
                            },
                    text: sample_vals[0].otu_labels
                    }
                
                var data = [trace2];
        
                var layout = {
                    title: "Bacteria Cultures Per Sample",
                    margin: { t: 0 },
                    hovermode: "closest",
                    xaxis: { title: "OTU ID" },
                    margin: { t: 30}
                    };
        
                Plotly.newPlot('bubble', data, layout);

        })
    }


    function init () {
        var user_sel = d3.select("#selDataset");

        d3.json("./data/samples.json").then((data) => {
            var dropdown = data.names;
            
            dropdown.forEach((sample) => {
                user_sel
                    .append("option")
                    .text(sample)
                    .property("value", sample);
        
            });
            
            // var initSample = dropdown.filter(default_val => default_val.id == 940)
            var initSample = dropdown[0]
            buildGraphs(initSample);
            buildTable(initSample);

        });
    }


    function optionChanged(newSample) {
        buildGraphs(newSample);
        buildTable(newSample);
    }

    init();
