const socket = io("https://www.projectseveryweek.com");

function signup() {
    socket.emit('newUser', {
        username: document.getElementById('user').innerText,
        password: document.getElementById('pass').innerText
    })
}