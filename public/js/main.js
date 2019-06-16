const socket = io();

socket.on('update', (scrambles) => {
    document.getElementById('scrambles').innerHTML = scrambles;
    console.log(scrambles);
});