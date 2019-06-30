const socket = io.connect("https://projectseveryweek.com", {secure: true});

socket.on('userExistsError', () => {
    alert('A user with that username already exists!');
});

socket.on('signupSuccess', () => {
    alert('Successfully signed up!');
});

socket.on('unknownError', () => {
    alert('An unknown error occured!');
});

function signup() {
    socket.emit('newUser', {
        username: document.getElementById('user').value,
        password: document.getElementById('pass').value
    })
}