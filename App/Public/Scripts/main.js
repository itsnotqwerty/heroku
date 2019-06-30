const socket = io.connect("https://projectseveryweek.com", {secure: true});

socket.on('connection', () => {
    console.log('CONNECTED!');
})

function signup() {
    socket.emit('newUser', {
        username: document.getElementById('user').value,
        password: document.getElementById('pass').value
    })
}