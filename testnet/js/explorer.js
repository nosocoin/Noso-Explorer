// Basic Authentication credentials
const username = 'noso';
const password = 'Buzw1lZ-Qj7nqqU3AtRzwr9qciflXAMwJ51N8Bf7ZVA=';

// Create the Basic Auth header by encoding the credentials
const authHeader = 'Basic ' + btoa(username + ':' + password);

// Sending the RPC call to get the block count
fetch('https://rpc.nosocoin.com:19332', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // Ensure the content type is JSON
    'Origin': 'https://rpc.nosocoin.com',  // Ensure the origin matches
    'Authorization': authHeader,  // Basic Authentication header
  },
  body: JSON.stringify({
    "jsonrpc": "1.0",    // Standard JSON-RPC version
    "id": "noso_explorer",  // Unique ID for the request
    "method": "getblockcount",  // The RPC method to call
    "params": []   // No parameters for this method
  })
})
  .then(response => response.json())  // Parse the response as JSON
  .then(data => {
    // Check if the response contains a valid result
    if (data.error) {
      throw new Error(`Error: ${data.error.message}`);
    }

    // Output the block count result
    const blockCount = data.result;
    document.getElementById('getblockinfo').innerText = `Block Count: ${blockCount}`;
  })
  .catch(error => {
    // Handle any errors that may occur
    console.error('Error:', error);
    document.getElementById('getblockinfo').innerText = `Error: ${error.message}`;
  });
