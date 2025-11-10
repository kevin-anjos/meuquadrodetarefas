import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const createWebSocketServer = server => {
    const wss = new WebSocketServer({
        server
    });

    let clients = [];
  
    wss.on('connection', ws => {
        ws.on('message', data => receiveUserMessage(ws, data));
        ws.on('error', () => disconnectUser(ws));
        ws.on('close', () => disconnectUser(ws));
    });


    const receiveUserMessage = (ws, data) => {

        const message = JSON.parse(data);

        if (!message.token) return;

        let userID;

        try {
            const decoded = jwt.verify(message.token, process.env.JWT_SECRET);

            userID = decoded.id;

        } catch {
            return
        };

        if (!userID) return;

        if (message.firstCall) {
            ws.id = userID;
            clients.push(ws);
        };

        requestUpdate(userID);

    };

    const requestUpdate = userID => {
        if (!wss.clients) return;

        clients.forEach(client => {
            if (client.id === userID && client.readyState === 1) {
                client.send("Update!");
            };
        });
    };

    const disconnectUser = ws => {
        clients = clients.filter(client => client !== ws);
    };
}

export {
    createWebSocketServer
}