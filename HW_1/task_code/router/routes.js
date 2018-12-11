const controller = require('../controllers');

function routes(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.url === '/') {
        controller.getHomePage(req, res);

      } else if (req.url === '/api/users') {
        controller.getAllUsers(req, res);

      } else if (req.url.match(/^\/api\/users\/(.*)/)) {
        controller.getUserById(req, res);

      } else {
        controller.sendError(res)
      }
      break;

    case 'POST':
      if (req.url === '/api/users') {
        controller.createUser(req, res);
      } else {
        controller.sendError(res)
      }
      break;

    case 'PUT':
      if (req.url.match(/^\/api\/users\/(.*)/)) {
        controller.updateUser(req, res);
      } else {
        controller.sendError(res)
      }
      break;

    case 'DELETE':
      if (req.url.match(/^\/api\/users\/(.*)/)) {
        controller.removeUserById(req, res);
      } else {
        controller.sendError(res)
      }
      break;

    default:
      res.end(500, "server error")
  }
}

exports.routes = routes;
