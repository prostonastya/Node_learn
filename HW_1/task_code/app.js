// console.log('application entry point');

const {Server} = require('http');
const db = require("./fake-db/index");
const port = 3000;

const server = new Server((req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url === '/') {
        console.log('it works');
        let data = '<h6>it works</h6>';
        res.writeHeader(200);
        res.end(data, 'utf-8');
      };

      //Get Users collection
      if (req.url === '/api/users') {
        db.getCollection((err, collection) => {
          if (err) {
            res.writeHeader(500);
            res.end("No records has been found");
          }
          res.writeHeader(200,{'Content-Type': 'application/json'});
          res.end(JSON.stringify(collection));
        });
      };

      //Get User
      if (req.url.match(/^\/api\/users\/(.*)/)) {
        let id = req.url.substr(11);
        db.getById(id,(err, user) => {
          if (err) {
            res.writeHead(500);
            res.end("No records has been found");
          }
          res.writeHeader(200);
          res.end(JSON.stringify(user));
        });
      }
      break;

    case 'POST':
      //Create User
      if (req.url === '/api/users') {
        getData(req, (body)=> {
          let user = JSON.parse(body);
          db.create(user,(err, model) => {
            if (err) {
              res.writeHead(500);
              res.end("No records has been found");
            }
            res.writeHeader(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(model));
          })
        });
      }
      break;

    case 'PUT':
      //Create User
      if (req.url.match(/^\/api\/users\/(.*)/)) {
        getData(req, (body)=> {
          let user = JSON.parse(body);
          db.update(user,(err, model) => {
            if (err) {
              res.writeHead(500);
              res.end("No records has been found");
            }
            res.writeHeader(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(model));
          })
        });
      }
      break;

    case 'DELETE':
      //Delete User
      if (req.url.match(/^\/api\/users\/(.*)/)) {
        let id = req.url.substr(11);
        db.remove(id,(err) => {
          if (err) {
            res.writeHead(500);
            res.end("No records has been found");
          }
          res.writeHeader(200);
          res.end('User was deleted');
        });

        res.end(`user_delete ${id}`);
      }
      break;
    default:
      res.end(500, "server error")


  }
});

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});



function getData(req, callback) {
  let body = [];

  req.on('error', (err) => {
    console.error(err);
  })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      callback(body);
    });
}