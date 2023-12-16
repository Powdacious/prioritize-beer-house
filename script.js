// Sample data for initial table
const features = [
    { name: 'Feature A', value: 1, cost: 1 },
    { name: 'Feature B', value: 2, cost: 2 },
    // Add more features as needed
];

// Scoring options
const valueOptions = ['a beer', 'a week\'s wages', 'a holiday', 'their car', 'their house'];
const costOptions = ['a beer', 'a week\'s wages', 'a holiday', 'a car', 'a house'];

// Function to render the table
function renderTable() {
    const table = document.getElementById('featureTable');
    table.innerHTML = ''; // Clear existing content

    // Create header row
    const headerRow = table.insertRow();
    const headers = ['Feature Name', 'Value', 'Cost', 'Priority'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create data rows
    features.forEach(feature => {
        const row = table.insertRow();
        const priority = calculatePriority(feature.value, feature.cost); // Calculate priority

        // Add feature details to the row
        Object.values(feature).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = valueOptions.includes(value) ? valueOptions[value - 1] : value;
        });

        // Add priority to the row
        const priorityCell = row.insertCell();
        priorityCell.textContent = priority;
    });
}

// Function to calculate priority based on value and cost
function calculatePriority(value, cost) {
    return value * cost;
}

// Call the renderTable function to initially populate the table
renderTable();
