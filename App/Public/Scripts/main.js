const socket = new WebSocket("wss://projectseveryweek.com");

function signup() {
    socket.send({
        type: 'newUser',
        data: {
            username: document.getElementById('user').innerText,
            password: document.getElementById('pass').innerText
        }
    })
}