// Constants
const totalSupply = 21000000;
const circulatingSupplyUrl = 'https://api.nosocoin.com/info/circulating_supply';

// Function to fetch circulating supply and update HTML
async function updateCirculatingSupply() {
    try {
        // Fetch circulating supply from the API
        const response = await fetch(circulatingSupplyUrl);
        const circulatingSupply = await response.text();

        // Update the circulating supply element
        document.getElementById('circulating_supply').innerText = circulatingSupply;

        // Calculate the percentage of the total supply
        const circulatingPercentage = (circulatingSupply / totalSupply) * 100;

        // Update the total circulating percentage element
        document.getElementById('total_circulating_percentage').innerText = circulatingPercentage.toFixed(2) + '%';
    } catch (error) {
        console.error('Error fetching circulating supply:', error);
    }
}

// Update every 60 seconds
setInterval(updateCirculatingSupply, 60000);

// Initial update
updateCirculatingSupply();
