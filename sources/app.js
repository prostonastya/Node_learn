// console.log('application entry point');

const {Server} = require('http');
const db = require("./fake-db/index");
const port = 3000;

const server = new Server((req, res) => {
    console.log('URL', req.url);

    switch (req.method) {
        case 'GET':
            if (req.url ==='/') {
                console.log ('it works');
                let data = '<h6>it works</h6>';
                res.end(data,'utf-8');
            };
            //Get Users collection
            if(req.url === '/api/users'){
               const data = db.getCollection(cb);
               // console.log(data);
                res.end('get user collection');
            };
            //Get User
            if(req.url.match(/^\/api\/users\/(.*)/)){
                let id = req.url.substr(11);
                console.log('id',id);
                res.end(`user_one ${id}`);
            }

        break;

        case 'POST':
            //Create User
            if(req.url === '/api/users'){
                res.end('user_added');
            }
        break;

        case 'PUT':
            //Create User
            if(req.url.match(/^\/api\/users\/(.*)/)){
                let id = req.url.substr(11);
                console.log('id',id);
                res.end(`user_update ${id}`);
            }
        break;

        case 'DELETE':
            //Delete User
            if(req.url.match(/^\/api\/users\/(.*)/)){
                let id = req.url.substr(11);
                console.log('id',id);
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

const cb = function(err,collection){
    if(err) {
        console.log(err);
        return;
    }
    // return collection;
    sendResponse(collection);
};

function sendResponse(collection) {
    console.log('collection',collection);
    // res.send(collection)
}