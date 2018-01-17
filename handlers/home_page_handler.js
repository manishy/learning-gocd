const DefaultHandler = require("./default_handler.js");
let utility = require("../utility.js");
const homePage = utility.getContent("./templates/home");
class HomePageHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    if (req.user) {
      let userName = req.user.userName;
      let user = this.app.getUser(userName);
      let content = utility.generateHomePageFor(user);
      res.setHeader("Content-Type", "text/html");
      res.write(content);
      res.end();
    } else {
      let loginLink = `<a id="login" href="login">login to add todo</a>`;
      let html = utility.replace(homePage,[loginLink,"","",""])
      res.write(html);
      res.end();
    }
  }
}


module.exports = HomePageHandler;
