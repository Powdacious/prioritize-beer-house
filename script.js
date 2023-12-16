// Sample data for initial table
const features = [
    { name: 'Feature A', value: 1, cost: 1 },
    { name: 'Feature B', value: 2, cost: 2 },
    // Add more features as needed
];

// Scoring options
const valueOptions = ['a beer', 'a week\'s wages', 'a holiday', 'their car', 'their house'];
const costOptions = ['a beer', 'a week\'s wages', 'a holiday', 'a car', 'a house'];

// Function to submit feature entered by the user
function submitFeature() {
    const featureName = document.getElementById('featureName').value;
    const value = document.getElementById('value').value;
    const cost = document.getElementById('cost').value;

    // Create an object to represent the feature
    const newFeature = {
        name: featureName,
        value: value,
        cost: cost,
    };

    // Get the existing features from sessionStorage
    let featuresFromSession = JSON.parse(sessionStorage.getItem('features')) || [];

    // Add the new feature to the array
    featuresFromSession.push(newFeature);

    // Store the updated features in sessionStorage
    sessionStorage.setItem('features', JSON.stringify(featuresFromSession));

    // Refresh the table to display the updated features
    renderTable();
}

// Function to calculate priority based on value and cost
function calculatePriority(value, cost) {
    return value * cost;
}

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

    // Get the features from sessionStorage
    const featuresFromSession = JSON.parse(sessionStorage.getItem('features')) || [];

    // Create data rows
    featuresFromSession.forEach(feature => {
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

// Call the renderTable function to initially populate the table
renderTable();
