const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Router = require('./routes');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());
app.use(Router);



const connectDb = require('./database/db');
const PORT = process.env.PORT;

const server = http.createServer(app);

const io = require('socket.io')(server);

const authenticateJWT = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return err;
    }
};

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = authenticateJWT(token);

    if (user) {
        socket.user = user;
        next();
    } else {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {

    console.log(`${socket.user.username} is joined the chat`);

    socket.on('chat message', (msg) => {
        const timestamp = new Date().toISOString();
        const messageData = {
            username: socket.user.username,
            message: msg,
            timestamp
        };
        io.emit('chat message', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User left the chat:', socket.user.username);
    });
});

connectDb().then(()=>{
    server.listen(PORT , ()=>{
        console.log(`server is running on port ${PORT}`);
    });
});