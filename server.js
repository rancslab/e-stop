const dgram = require('dgram');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

//Enbale CORS so your frontend can access this server
app.use(cors());

//Crate a UDP client
const udpClient = dgram.createSocket('udp4');

//Define an endpoint to handle the stop signal
app.post('/send-stop-signal', (req, res) => {
    const stopSignal = Buffer.from([1]); //1 is the stop signal

    console.log('Sending stop signal:', stopSignal);

    ///Send the UDP stop signal to the RSU
    udpClient.send(stopSignal, 44002, '127.0.0.1', (err) => {
        if (err) {
          return res.status(500).send('Failed to send stop signal');
        }
        res.send('Stop signal sent successfully');
      });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});