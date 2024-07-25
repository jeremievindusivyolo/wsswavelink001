import { defineConfig } from 'vite';
import { WebSocketServer } from 'ws';
//const WebSocket = require('ws');

function websocketServer() {
    
    const wss = new WebSocketServer({ port: 2048 });
    
    wss.on('connection', ws => {
      console.log('Client connected');
      ws.on('message', message => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach(client => {
          client.send(`${message}`); 
        }); 
        //ws.send(`Echo: ${message}`);
      });
    
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    }); 
    
    console.log('WebSocket server is running on ws://localhost:3001');
}

export default defineConfig({
  plugins: [websocketServer()],
  server: {
    port: 3000, // This is for the Vite server, if needed for other purposes
  },
});
