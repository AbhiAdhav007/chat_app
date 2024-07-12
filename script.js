
let currentUser ='';
document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

document.getElementById('register-button').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Registration successful! Please log in.');
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } else {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
    }
});

document.getElementById('login-button').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { token , username } = await response.json();
        currentUser = username;
        localStorage.setItem('token', token);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        initSocket(token);
    } else {
        alert('Login failed');
    }
});

function initSocket(token) {

    const socket = io('http://localhost:5000', {
        auth: {
            token: token
        }
    });

    socket.on('chat message', (msgData) => {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        console.log('user' , msgData)
        console.log('cuser' , currentUser)
        if (msgData.username === currentUser) {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }

        const usernameElement = document.createElement('div');
        usernameElement.classList.add('username');
        usernameElement.textContent = msgData.username;

        const textElement = document.createElement('div');
        textElement.classList.add('text');
        textElement.textContent = msgData.message;

        const timestampElement = document.createElement('div');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = new Date(msgData.timestamp).toLocaleString();

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(textElement);
        messageElement.appendChild(timestampElement);
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    document.getElementById('send-button').addEventListener('click', () => {
        const message = document.getElementById('message').value;
        socket.emit('chat message', message);
        document.getElementById('message').value = '';
    });
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('token');
        document.getElementById('chat-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
        socket.disconnect();
    });
}
