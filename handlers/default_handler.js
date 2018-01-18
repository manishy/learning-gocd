const fs = require("fs");
let realTimePath = "./data/data.json";
let testPath = process.env.TESTPATH;
let path = testPath || realTimePath;
let data = fs.readFileSync(path, "utf8");
let ToDoApp = require("../lib/userHandler.js");
let todoApp = new ToDoApp();
todoApp.retrive(data);
let registered_users = [{
  userName: 'ashishm',
  name: 'ashish mahindrakar'
}];
todoApp.registered_users =registered_users;
class DefaultHandler {
  constructor () {
    this.app = todoApp;
  }
  execute(){}
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = DefaultHandler


// e GO_SERVER

// docker container run -e GO_SERVER=172.17.0.2 gocd/gocd-agent-alpine-3.8:v19.1.0