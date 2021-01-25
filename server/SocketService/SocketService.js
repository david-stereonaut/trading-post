const socketIo = require('socket.io');

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
    }

    newConnection = client => {
        client.on('join', data => {
            const clientInfo = {
                socketId: client.id,
                userId: data._id
            }
            this.activeUsers.push(clientInfo);
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
            console.log(`remaining users:`)
            console.log(this.activeUsers);
        })
    }
}

module.exports = SocketService;