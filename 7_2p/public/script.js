const socket = io();

socket.on('orderUpdate', (data) => {
    // Update the status text
    document.getElementById('status-label').innerText = data.text;

    // Update the width of the blue bar
    document.getElementById('progress-fill').style.width = data.percent + "%";

    // Update the percentage text
    document.getElementById('percent-label').innerText = Math.round(data.percent) + "% Complete";
});