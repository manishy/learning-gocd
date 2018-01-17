const DefaultHandler = require("./default_handler.js");
class LoginHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    let user = this.app.registered_users.find(u => u.userName == req.body.userName);
    if (!user) {
        res.setHeader('Set-Cookie', `message=login failed; Max-Age=5`);
        res.redirect('/login');
        return;
      }
      let date = new Date();
      let sessionid = date.getTime();
      res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
      user.sessionid = sessionid;
      res.redirect('/home');
    }
  }

module.exports = LoginHandler