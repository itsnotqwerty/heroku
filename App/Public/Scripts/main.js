const socket = io.connect("https://projectseveryweek.com", {secure: true});

function signup() {
    socket.emit('newUser', {
        username: document.getElementById('user').innerText,
        password: document.getElementById('pass').innerText
    })
}