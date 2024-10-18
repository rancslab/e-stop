const dgram = require('dgram');
const express = require('express');
const cors = require('cors'); 

const app = express(); // Initialize the app first
const PORT = 3001;

// Enable CORS so your frontend can access this server
app.use(cors({ origin: '*' })); 

// Create a UDP client
const udpClient = dgram.createSocket('udp4');

// Define an endpoint to handle the stop signal
app.post('/send-stop-signal', (req, res) => {
    const stopSignal = Buffer.from([1]); // 1 is the stop signal

    console.log(stopSignal);

    // Send the UDP stop signal to the RSU
    udpClient.send(stopSignal, 44002, 'localhost', (err) => {
        if (err) {
            console.error('Error sending UDP signal:', err);
            return res.status(500).send('Failed to send stop signal');
        }
        res.send('Stop signal sent successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
