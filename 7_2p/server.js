const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const stages = ["Order Received", "Processing", "Packing", "Shipped", "Out for Delivery", "Delivered"];
let index = 0;

io.on('connection', (socket) => {
  console.log('A customer is tracking their order');
   // Send the status when a client connects
    socket.emit('orderUpdate', {
        text: stages[index],
        percent: ((index + 1) / stages.length) * 100
    });
    socket.on('disconnect', () => {
        console.log('Customer closed the tracker');
    });
});

setInterval(() => {
  // Move to the next stage
    index = (index + 1) % stages.length; 
    
    io.emit('orderUpdate', {
        text: stages[index],
        percent: ((index + 1) / stages.length) * 100
    });
}, 5000); // Update every 5 seconds

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});