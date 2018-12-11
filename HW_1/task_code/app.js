const http = require('http');
const routes = require('./router/routes');
const port = 3000;

const server = http.createServer((req, res) => {
  routes.routes(req,res);
});

server.listen(port, (err) => {
  if (err) {
    if (err.code === 'EADDRINUSE') {
      return console.log(`${port} port is currently in use`)
    }
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
