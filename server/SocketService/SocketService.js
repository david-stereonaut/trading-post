const socketIo = require('socket.io');

// const server = app.listen(4000);
// const io = require('socket.io')(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   });

class SocketService {
    constructor(server, cors) {
        this.io = socketIo(server, cors);
        this.io.on('connection', this.onConnect);
        this.activeUsers = [];
    }

    onConnect = client => {
        this.newConnection(client);
        this.newMessage(client);
        this.partnerTyping(client);
        this.changeStatus(client);
        this.disconnection(client);
        // this.test(client);
    }

    newConnection = client => {
        client.on('join', data => {
            const clientInfo = {
                socketId: client.id,
                userId: data._id
            }
            this.activeUsers.push(clientInfo);
            // console.log(`${clientInfo.socketId} joined`);
            console.log(this.activeUsers);
        });
    }

    newMessage = client => {
        client.on('sendMessage', data => {
            client.emit('getMessage', data);
            const reciverUserId = data.users.find(u => u !== data.messages[data.messages.length - 1].senderId);
            if (this.activeUsers.every(a => a.userId !== reciverUserId)) {return}
            this.activeUsers.forEach(a => {
                if(a.userId === reciverUserId) {client.to(a.socketId).emit('getMessage', data)}
            })
        })
    }

    partnerTyping = client => {
        client.on('IAmTyping', data => {
            if (this.activeUsers.every(a => a.userId !== data.partnerId)) {return}
            this.activeUsers.forEach(a => {
                if(a.userId === data.partnerId) {client.to(a.socketId).emit('partnerTyping', data)}
            })
        })
    }

    changeStatus = client => {
        client.on('changeStatus', data => {
            client.emit('statusChanged', data.conversation);
            if (this.activeUsers.every(a => a.userId !== data.partnerId)) {return}
            this.activeUsers.forEach(a => {
                if(a.userId === data.partnerId) {
                    client.to(a.socketId).emit('statusChanged', data.conversation)
                }
            })
        })
    }

    disconnection = client => {
        client.on('disconnect', () => {
            this.activeUsers.splice(this.activeUsers.find(a => a.socketId === client.id), 1);
            console.log(`${client.id} disconnected`);
        })
    }
}

module.exports = SocketService;

// this.io.on('connection', function(client) {
//   console.log('Client connected...');
//   client.on('join', function(data) {
//      console.log(data);
//     });
//      client.emit('messages', 'Hello from server');
//      client.on('messages', function(data) {
//          console.log(data);
//       client.emit('broad', data);
//       client.broadcast.emit('broad',data);
//   });
// });