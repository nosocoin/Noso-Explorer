async function fetchBlockCount() {
    try {
        const response = await fetch('https://api.nosocoin.com/block/getblockcount');
        const data = await response.json();
        
        if (data.blockCount !== undefined) {
            document.getElementById('bestheight').textContent = data.blockCount;
        } else {
            console.error('blockCount not found in response');
        }
    } catch (error) {
        console.error('Error fetching block count:', error);
    }
}

// Call the function when the page loads
window.onload = fetchBlockCount;
