const socket = io.connect("https://projectseveryweek.com", {secure: true});

socket.on('nodeUpdate', (packet) => {
    console.log('Node updated!');
    console.log(packet);
})