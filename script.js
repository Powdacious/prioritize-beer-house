// Sample data for initial table
const features = [
    { name: 'Feature A', value: 5, cost: 3 },
    { name: 'Feature B', value: 8, cost: 2 },
    // Add more features as needed
];

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
        const priority = feature.value * feature.cost; // Calculate priority

        // Add feature details to the row
        Object.values(feature).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Add priority to the row
        const priorityCell = row.insertCell();
        priorityCell.textContent = priority;
    });
}

// Call the renderTable function to initially populate the table
renderTable();
