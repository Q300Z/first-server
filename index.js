const http = require('http');
const app = require('./app');

const hostname = '192.168.1.51';
const port = 3000;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
