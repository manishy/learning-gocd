const DefaultHandler = require("./default_handler.js");
class LoginHandler extends DefaultHandler {
  constructor(fs,path) {
    super();
    this.fs=fs;
    this.path = path;
  }
  execute(req, res) {
    const loginPage = this.fs.readFileSync(this.path, "utf8");
      res.setHeader('Content-type', 'text/html');
      res.write(req.cookies.message || "");
      res.write(loginPage);
      res.end();
  }
}

module.exports = LoginHandler
