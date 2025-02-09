// Constants
const totalSupply = 21000000;
const circulatingSupplyUrl = 'https://api.nosocoin.com/info/circulating_supply';

// Function to format numbers with shorthand notation (K for thousands, M for millions)
function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}

// Function to fetch circulating supply and update HTML
async function updateCirculatingSupply() {
    try {
        // Fetch circulating supply from the API
        const response = await fetch(circulatingSupplyUrl);
        const circulatingSupply = parseInt(await response.text(), 10);

        // Format the circulating supply and update the HTML
        const formattedCirculatingSupply = formatNumber(circulatingSupply);
        document.getElementById('circulating_supply').innerText = formattedCirculatingSupply;

        // Calculate the percentage of the total supply
        const circulatingPercentage = (circulatingSupply / totalSupply) * 100;

        // Format the percentage
        const formattedPercentage = circulatingPercentage.toFixed(2) + '%';

        // Update the total circulating percentage element
        document.getElementById('total_circulating_percentage').innerText = formattedPercentage;
    } catch (error) {
        console.error('Error fetching circulating supply:', error);
    }
}

// Update every 60 seconds
setInterval(updateCirculatingSupply, 60000);

// Initial update
updateCirculatingSupply();
