const socket = io();

io.on('update', (scrambles) => {
    document.getElementById('scrambles').innerHTML = scrambles
})