async function fetchBlockTime() {
    try {
        const hashResponse = await fetch('https://api.nosocoin.com/block/getbestblockhash');
        const hashData = await hashResponse.json();
        const bestBlockHash = hashData.bestBlockhash; // Ensure key name matches API response

        if (!bestBlockHash) throw new Error("Best block hash not found.");

        const blockResponse = await fetch(`https://api.nosocoin.com/block/getblock?block_id=${bestBlockHash}`);
        const blockData = await blockResponse.json();

        const blockTime = new Date(blockData.time * 1000);
        const blockHeight = blockData.height; // Get the block height

        function updateElapsedTime() {
            const currentTime = new Date();
            const elapsedTime = currentTime - blockTime; // Time difference in milliseconds

            // Convert elapsed time to minutes and seconds
            const seconds = Math.floor(elapsedTime / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            const formattedElapsedTime = `${minutes}m ${remainingSeconds}s`;

            // Display the elapsed time in minutes and seconds only
            document.getElementById('block_elapsed_time').textContent = 
                `${formattedElapsedTime}`;
        }

        // Display the block height
        document.getElementById('block_height').textContent = 
            `${blockHeight}`;
        
        // Update the elapsed time immediately on page load
        updateElapsedTime();
        
        // Update the elapsed time every second
        setInterval(updateElapsedTime, 1000); // Update every 1000 milliseconds (1 second)
        
    } catch (error) {
        console.error('Error fetching block time:', error);
    }
}

window.onload = () => {
    fetchBlockTime();
};
