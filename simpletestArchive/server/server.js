import { WebSocketServer } from 'ws';


const WEB_SOCKET_PORT_NUMBER  = 8081;


const wss = new WebSocketServer({ port: WEB_SOCKET_PORT_NUMBER });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('Server received: %s', data);
  });

  ws.send('something');
});

console.log("Web Socket open on port " + WEB_SOCKET_PORT_NUMBER + "...");