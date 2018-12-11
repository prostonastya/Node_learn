const db = require("../fake-db/index");

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

module.exports = {

  getHomePage(req,res) {
    res.setHeader("Content-Type", "text/html");
    res.write('<H3>Rest API</H3>');
    res.end();
  },

  getAllUsers(req,res) {
    db.getCollection((err, collection) => {
      if (err) {
        res.writeHeader(500);
        res.end("No records has been found");
      }
      res.writeHeader(200,{'Content-Type': 'application/json'});
      res.end(JSON.stringify(collection));
    });
  },

  createUser(req,res) {
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
  },

  updateUser(req,res) {
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
  },

  getUserById(req,res) {
    let id = req.url.substr(11);

    db.getById(id,(err, user) => {
      if (err) {
        res.writeHead(500);
        res.end("No records has been found");
      }
      res.writeHeader(200);
      res.end(JSON.stringify(user));
    });
  },

  removeUserById(req,res) {
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
  },

  sendError(res) {
    res.writeHeader(404);
    res.end('check your url address');
  }
};