const DefaultHandler = require("./default_handler.js");
class LoadUserHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    let sessionid = req.cookies.sessionid;
    let user = this.app.registered_users.find(u => u.sessionid == sessionid);
    if (sessionid && user) {
      req.user = user;
    }
  };
}

module.exports = LoadUserHandler
