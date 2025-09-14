// Function to create a simple bar chart
function createBarChart(data) {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 60 }; // Increased left margin for larger numbers

    const svg = d3.select('#chart')  
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .style('background-color', 'black')
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
                     .domain(data.map(d => d.year))
                     .range([0, width])
                     .padding(0.1);

    const yScale = d3.scaleLinear()
                     .domain([0, 25000])  // Changed to fixed range 0-25000
                     .range([height, 0]);

    // Add Y axis
    svg.append('g')
       .call(d3.axisLeft(yScale)
           .tickFormat(d => `₹${d.toLocaleString()}`)) // Format as currency
       .style('color', 'white');

    // Add Y axis label
    svg.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('y', 0 - margin.left)
       .attr('x', 0 - (height / 2))
       .attr('dy', '1em')
       .style('text-anchor', 'middle')
       .style('fill', 'white')
       .text('Stipend (₹)');

    // Add X axis
    svg.append('g')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(xScale))
       .style('color', 'white')
       .selectAll('text')
       .style('text-anchor', 'end')
       .attr('transform', 'rotate(-45)');

    // Update bars
    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('x', d => xScale(d.year))
       .attr('y', d => yScale(d.value))
       .attr('width', xScale.bandwidth())
       .attr('height', d => height - yScale(d.value))
       .attr('fill', 'steelblue');
}

// Function to create a line graph
function createLineGraph(data) {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 60 };

    const svg = d3.select('#chart')  
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .style('background-color', 'black')
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scalePoint()
                     .domain(data.map(d => d.year))
                     .range([0, width]);

    const yScale = d3.scaleLinear()
                     .domain([0, 25000])
                     .range([height, 0]);

    // Create line generator
    const line = d3.line()
                   .x(d => xScale(d.year))
                   .y(d => yScale(d.value));

    // Add Y axis
    svg.append('g')
       .call(d3.axisLeft(yScale)
           .tickFormat(d => `₹${d.toLocaleString()}`))
       .style('color', 'white');

    // Add Y axis label
    svg.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('y', 0 - margin.left)
       .attr('x', 0 - (height / 2))
       .attr('dy', '1em')
       .style('text-anchor', 'middle')
       .style('fill', 'white')
       .text('Stipend (₹)');

    // Add X axis
    svg.append('g')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(xScale))
       .style('color', 'white')
       .selectAll('text')
       .style('text-anchor', 'end')
       .attr('transform', 'rotate(-45)');

    // Add the line
    svg.append('path')
       .datum(data)
       .attr('fill', 'none')
       .attr('stroke', 'steelblue')
       .attr('stroke-width', 2)
       .attr('d', line);

    // Add dots
    svg.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('cx', d => xScale(d.year))
       .attr('cy', d => yScale(d.value))
       .attr('r', 4)
       .attr('fill', 'white');
}

// Updated sample data with realistic stipend values
const data = [
    { year: "1990", stipend: 2500, buyingPower1990: 2500 },
    { year: "1991", stipend: 2500, buyingPower1990: 2846.76 },
    { year: "1992", stipend: 2500, buyingPower1990: 3182.33 },
    { year: "1993", stipend: 2500, buyingPower1990: 3383.67 },
    { year: "1994", stipend: 2500, buyingPower1990: 3730.43 },
    { year: "1995", stipend: 2500, buyingPower1990: 4111.86 },
    { year: "1996", stipend: 2500, buyingPower1990: 4480.98 },
    { year: "1997", stipend: 2500, buyingPower1990: 4802.01 },
    { year: "1998", stipend: 2500, buyingPower1990: 5437.36 },
    { year: "1999", stipend: 5000, buyingPower1990: 5691.28 },
    { year: "2000", stipend: 5000, buyingPower1990: 5919.46, buyingPower2000: 5228.19 },
    { year: "2001", stipend: 5000, buyingPower1990: 6143.18, buyingPower2000: 5451.90 },
    { year: "2002", stipend: 5000, buyingPower1990: 6407.16, buyingPower2000: 5715.88 },
    { year: "2003", stipend: 5000, buyingPower1990: 6651.01, buyingPower2000: 5959.73 },
    { year: "2004", stipend: 5000, buyingPower1990: 6901.57, buyingPower2000: 6210.29 },
    { year: "2005", stipend: 5000, buyingPower1990: 7194.63, buyingPower2000: 6503.36 },
    { year: "2006", stipend: 5000, buyingPower1990: 7611.67, buyingPower2000: 6920.39 },
    { year: "2007", stipend: 8000, buyingPower1990: 8096.75, buyingPower2000: 7405.48, buyingPower2007: 8000.00 },
    { year: "2008", stipend: 8000, buyingPower1990: 8772.77, buyingPower2000: 8081.50, buyingPower2007: 8676.02 },
    { year: "2009", stipend: 8000, buyingPower1990: 9727.45, buyingPower2000: 9036.18, buyingPower2007: 9630.70 },
    { year: "2010", stipend: 8000, buyingPower1990: 10893.72, buyingPower2000: 10202.44, buyingPower2007: 10796.97 },
    { year: "2011", stipend: 8000, buyingPower1990: 11864.54, buyingPower2000: 11173.27, buyingPower2007: 11767.79 },
    { year: "2012", stipend: 8000, buyingPower1990: 12989.18, buyingPower2000: 12297.91, buyingPower2007: 12892.43 },
    { year: "2013", stipend: 8000, buyingPower1990: 14290.42, buyingPower2000: 13599.15, buyingPower2007: 14193.67 },
    { year: "2014", stipend: 8000, buyingPower1990: 15242.97, buyingPower2000: 14551.70, buyingPower2007: 15146.22 },
    { year: "2015", stipend: 12400, buyingPower1990: 15990.94, buyingPower2000: 15299.67, buyingPower2007: 15894.19, buyingPower2015: 12400.00 },
    { year: "2016", stipend: 12400, buyingPower1990: 16782.21, buyingPower2000: 16090.93, buyingPower2007: 16685.46, buyingPower2015: 13191.27 },
    { year: "2017", stipend: 12400, buyingPower1990: 17340.75, buyingPower2000: 16649.47, buyingPower2007: 17244.00, buyingPower2015: 13749.81 },
    { year: "2018", stipend: 12400, buyingPower1990: 18023.77, buyingPower2000: 17332.50, buyingPower2007: 17927.02, buyingPower2015: 14432.83 },
    { year: "2019", stipend: 12400, buyingPower1990: 18695.97, buyingPower2000: 18004.69, buyingPower2007: 18599.22, buyingPower2015: 15105.03 },
    { year: "2020", stipend: 12400, buyingPower1990: 19934.28, buyingPower2000: 19243.01, buyingPower2007: 19837.53, buyingPower2015: 16343.34 },
    { year: "2021", stipend: 12400, buyingPower1990: 20957.19, buyingPower2000: 20265.92, buyingPower2007: 20860.44, buyingPower2015: 17366.25 },
    { year: "2022", stipend: 12400, buyingPower1990: 22361.12, buyingPower2000: 21669.85, buyingPower2007: 22264.37, buyingPower2015: 18770.18 },
    { year: "2023", stipend: 12400, buyingPower1990: 23624.34, buyingPower2000: 22933.06, buyingPower2007: 23527.58, buyingPower2015: 20033.39 },
    { year: "2024", stipend: 12400, buyingPower1990: 24794.46, buyingPower2000: 24103.18, buyingPower2007: 24697.71, buyingPower2015: 21203.52 }
];

// Multi-line graph function
function createMultiLineGraph(data) {
    const width = 800;  // Increased width
    const height = 400; // Increased height
    const margin = { top: 20, right: 100, bottom: 50, left: 70 }; // Adjusted margins

    const svg = d3.select('#chart')  
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .style('background-color', 'black')
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scalePoint()
                     .domain(data.map(d => d.year))
                     .range([0, width]);

    const yScale = d3.scaleLinear()
                     .domain([0, 25000])
                     .range([height, 0]);

    // Line generators for each metric
    const lineGenerators = {
        stipend: d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.stipend)),
        buyingPower1990: d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.buyingPower1990))
    };

    // Add axes
    svg.append('g')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(xScale))
       .style('color', 'white')
       .selectAll('text')
       .style('text-anchor', 'end')
       .attr('transform', 'rotate(-45)');

    svg.append('g')
       .call(d3.axisLeft(yScale)
           .tickFormat(d => `₹${d.toLocaleString()}`))
       .style('color', 'white');

    // Add lines with different colors
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
    let colorIndex = 0;

    Object.entries(lineGenerators).forEach(([key, lineGen]) => {
        svg.append('path')
           .datum(data)
           .attr('fill', 'none')
           .attr('stroke', colors[colorIndex])
           .attr('stroke-width', 2)
           .attr('d', lineGen);
        
        // Add legend
        svg.append('circle')
           .attr('cx', width + 10)
           .attr('cy', 20 + (colorIndex * 20))
           .attr('r', 6)
           .style('fill', colors[colorIndex]);

        svg.append('text')
           .attr('x', width + 20)
           .attr('y', 20 + (colorIndex * 20))
           .text(key)
           .style('font-size', '12px')
           .style('fill', 'white')
           .attr('alignment-baseline', 'middle');

        colorIndex++;
    });
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    createLineGraph(data);
    createMultiLineGraph(data);
});