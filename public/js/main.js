const socket = io();

socket.on('update', (scrambles) => {
    document.getElementById('scrambles').innerHTML = scrambles
});