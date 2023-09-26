class RCON {
    constructor(serverAdress, serverPort) {
        this.connected = false
        this.serverAdress = serverAdress
        this.serverPort = serverPort
        this.ws = new WebSocket(`ws://${serverAdress}:${serverPort}`)
        this.ws.onmessage = (message) => this.onMessage(message);
        this.ws.onclose = () => this.onClose();
    }

    sendMessage(packet, message) {
        this.ws.send(`PACKET.${packet} ${message}`)
    }

    auth(password) {
        this.sendMessage('AUTH', password)
    }

    onMessage(message) {
        message = message.data
        const args = message.split(' ')
        const packet = args[0].split('.')[1]
        message = args.slice(1).join(' ')

        if (packet == 'AUTH_REQUESTED') {
            const password = prompt(`${this.serverAdress}:${this.serverPort} has requested authentication. Please enter the password.`)
            if (password) {
                this.auth(password)
            }
        } else if (packet == 'AUTHORIZED') {
            this.connected = true
        } else if (packet == 'UNAUTHORIZED') {
            this.connected = false
        } else if (packet == 'RCON_ERROR_RESPONSE') {
            alert(message)
        } else if (packet == 'RCON_SUCCESS_RESPONSE') {
            alert(message)
        }

        console.log(packet, message)
    }

    onClose() {
        alert("CLOSED!")
    }
}