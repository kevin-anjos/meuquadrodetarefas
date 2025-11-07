import { WebSocketServer } from 'ws';

const SERVER_URL = 'https://meuquadrodetarefas.onrender.com';

export default server => {
  const wss = new WebSocketServer({
    server
  });
  
  wss.on('connection', (ws, req) => {
    ws.on('message', data => receiveMessage(data));
  });

  const receiveMessage = async data => {

  const message = data.toString();

  const { tasksList, token } = JSON.parse(message);

  const stringfiedTasksList = JSON.stringify(tasksList);

  try {
      await fetch(`${SERVER_URL}/users/tasks`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            tasksList: stringfiedTasksList
        })  
      })
      sendMessage("Received!");
    } catch (error) {
      console.error(error);
    }

  };

  const sendMessage = message => {
  if (!wss.clients) return;

  wss.clients.forEach(client => {
      client.send(message);
    });
  };



  return wss;
};