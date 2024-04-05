/**
 * This function generates an SVG string for a bar graph.
 * @param {Array} graphData - The data for the graph, each data point is an array of strings.
 * @returns {string} - The SVG string for the bar graph.
 */
function generateBarGraphSVG(graphData, studentFirstName) {
    const width = 900;
    const height = 250;
    const barWidth = 20;
    const barSpacing = 40;
    let svgString = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

    const maxMark = 100;

    const scaleY = (mark) => (height - 50) * (mark / maxMark);

    // Add bars to the graph
    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 135;
        const studentMarkHeight = scaleY(data[1]);
        svgString += `<rect x="${x}" y="${height - studentMarkHeight - 20}" width="${barWidth}" height="${studentMarkHeight}" fill="gray"/>`;
    });

    // Add Y-axis label
    svgString += `<text transform="rotate(-90)" x="${-height / 2}" y="${15 + 50}" text-anchor="middle">Performance</text>`;

    // Add polyline to represent class average
    let points = '';
    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 132 + barWidth / 2;
        const y = height - scaleY(data[2]) - 20;
        points += `${x},${y} `;
    });
    svgString += `<polyline points="${points.trim()}" stroke="#f0183e" fill="none" stroke-width="2"/>`;

    // Add circles to mark class average points
    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 134 + barWidth / 2;
        const y = height - scaleY(data[2]) - 20;
        svgString += `<circle cx="${x}" cy="${y}" r="4" fill="#f0183e"/>`;
    });

    // Add Y-axis labels
    const yAxisLabels = [0, Math.round(maxMark / 4), Math.round(maxMark / 2), Math.round(3 * maxMark / 4), maxMark];

    yAxisLabels.forEach((label) => {
        const y = height - scaleY(label) - 20;

        svgString += `<text x="120" y="${y}" text-anchor="end" font-size="12">${label}</text>`;
    });

    // Add legend for the graph
    const legendX = width - 400;

    svgString += `<circle cx="${legendX + 10}" cy="31" r="4" fill="#f0183e"/>`;

    svgString += `<text x="${legendX + 20}" y="35" text-anchor="start" font-size="10">Class Average</text>`;

    svgString += `<rect x="${legendX + 5}" y="51" width="10" height="10" fill="gray"/>`;

    svgString += `<text x="${legendX + 20}" y="${55 + 5}" text-anchor="start" font-size="10">${studentFirstName}'s Marks</text>`;

    // Add X-axis labels for subjects
    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 135;
        const subjectLabel = data[0].substring(0, 3).toUpperCase();
        svgString += `<text x="${x + barWidth / 2}" y="${height}" text-anchor="middle" font-size="12">${subjectLabel}</text>`;
    });

    svgString += '</svg>';
    return svgString;
}

module.exports = {generateBarGraphSVG};
