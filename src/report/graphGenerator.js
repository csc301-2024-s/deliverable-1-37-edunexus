/**
 * This function generates an SVG string for a bar graph.
 * @param {Array} graphData - The data for the graph, each data point is an array of strings.
 * @returns {string} - The SVG string for the bar graph.
 */
function generateBarGraphSVG(graphData) {
    const width = 900;
    const height = 250;
    const barWidth = 20;
    const barSpacing = 20;
    let svgString = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

    const maxMark = 100;

    const scaleY = (mark) => (height - 50) * (mark / maxMark);

    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 65;
        const studentMarkHeight = scaleY(data[1]);
        svgString += `<rect x="${x}" y="${height - studentMarkHeight - 20}" width="${barWidth}" height="${studentMarkHeight}" fill="gray"/>`;
    });

    svgString += `<text transform="rotate(-90)" x="${-height / 2}" y="15" text-anchor="middle">Performance</text>`;

    let points = '';
    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 60 + barWidth / 2;
        const y = height - scaleY(data[2]) - 20;
        points += `${x},${y} `;
    });
    svgString += `<polyline points="${points.trim()}" stroke="#f0183e" fill="none" stroke-width="2"/>`;

    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 60 + barWidth / 2;
        const y = height - scaleY(data[2]) - 20;
        svgString += `<circle cx="${x}" cy="${y}" r="4" fill="#f0183e"/>`;
    });

    const yAxisLabels = [0, Math.round(maxMark / 4), Math.round(maxMark / 2), Math.round(3 * maxMark / 4), maxMark];

    yAxisLabels.forEach((label) => {
        const y = height - scaleY(label) - 20;

        svgString += `<text x="40" y="${y}" text-anchor="end">${label}</text>`;
    });

    const legendX = width - 400;

    svgString += `<rect x="${legendX}" y="20" width="90" height="50" fill="white" stroke="black"/>`;

    svgString += `<circle cx="${legendX + 10}" cy="30" r="4" fill="#f0183e"/>`;

    svgString += `<text x="${legendX + 20}" y="35" text-anchor="start" font-size="10">Class Average</text>`;

    svgString += `<rect x="${legendX + 5}" y="50" width="10" height="10" fill="gray"/>`;

    svgString += `<text x="${legendX + 20}" y="55" text-anchor="start" font-size="10">Student's Mark</text>`;

    graphData.forEach((data, i) => {
        const x = i * (barWidth + barSpacing) + 60;
        const subjectLabel = data[0].substring(0, 3).toUpperCase();
        svgString += `<text x="${x + barWidth / 2}" y="${height}" text-anchor="middle">${subjectLabel}</text>`;
    });

    svgString += '</svg>';
    return svgString;
}

module.exports = {generateBarGraphSVG};
