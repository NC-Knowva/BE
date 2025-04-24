const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

const users = {}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('register_user', (username) => {
        users[username] = socket.id;
        console.log('Registered user:', username, socket.id)
    });

    socket.on('send_message', (messageData) => {
        const { sender, receiver, body } = messageData
        const receiverSocketId = users[receiver]

        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receive_message', messageData)
        } else {
            console.log('receiver not found:', receiver)
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)

        for (const username in users) {
            if (users[username] === socket.id) {
                delete users[username]
                break
            }
        }
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080')
})
