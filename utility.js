const fs = require('fs');
const homePage = fs.readFileSync("./templates/home", "utf8");
let todoListTemplate = fs.readFileSync("./templates/todoListTitle", "utf8");
let addtodoForm = fs.readFileSync("./templates/addToDoForm", "utf8");
let toS = o => JSON.stringify(o, null, 2);
let data = fs.readFileSync("data/data.json", "utf8");
let ToDoApp = require("./lib/userHandler.js");
let todoApp = new ToDoApp();
todoApp.retrive(data);

let registered_users = [{
  userName: 'ashishm',
  name: 'ashish mahindrakar'
}];

exports.updateDB = function(){
  let dataBase = JSON.stringify(todoApp,null,2);
  fs.writeFileSync("data/data.json",dataBase);
}

const isGetRequest = function(req) {
  return req.method == "GET";
}

const getContentType = function(filePath) {
  let contentTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpeg': 'image/jpeg',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': "image/ico"
  }
  let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
  return contentTypes[fileExtension];
}

exports.logRequest = (req, res) => {
  let text = ['------------------------------',
  `${req.method} ${req.url}`,
  `HEADERS=> ${toS(req.headers)}`,
  `COOKIES=> ${toS(req.cookies)}`,
  `BODY=> ${toS(req.body)}`, ''
].join('\n');
fs.appendFile('./logs.txt', text, () => {});
console.log(`${req.method} ${req.url}`);
};


exports.requestNotFound = function(req, res) {
  let url = req.url;
  res.statusCode = 404;
  res.write(`${url} Not Found`);
  res.end()
}

exports.logoutUser = function(req, res) {
  res.setHeader('Set-Cookie', [`message=login failed; Max-Age=5`, `sessionid=0;Max-Age=5`]);
  if (req.user) delete req.user.sessionid;
  res.redirect('/home');
}

exports.homePageHandler = function(req, res) {
  if (req.user) {
    let userName = req.user.userName;
    let user = todoApp.users[userName];
    let content = generateHomePageFor(user);
    res.setHeader("Content-Type", "text/html");
    res.write(content);
    res.end();
  } else {
    let loginLink = `<a id="login" href="login">login to add todo</a>`;
    let content = homePage.replace("placeHolder", loginLink);
    content = content.replace("name", "");
    content = content.replace("home/logout", "");
    content = content.replace("addAToDo", "");
    res.write(content);
    res.end();
  }
}
exports.fileServer = function(req, res) {
  let path = 'public' + req.url;
  if (isGetRequest(req)) {
    try {
      let data = fs.readFileSync(path);
      res.setHeader("Content-Type", getContentType(path));
      res.statusCode = 200;
      res.write(data);
      res.end()
    } catch (e) {
      return;
    };
  };
}

const generateHomePageFor = (user) => {
  let content = homePage.replace("placeHolder", todoListTemplate);
  content = content.replace("name", user.name);
  let logout = `<a href="logout"> Logout </a>`
  content = content.replace("home/logout", logout);
  content = content.replace("addAToDo", addtodoForm);
  return content;
}

exports.redirectToIndexpage = function(req, res) {
  res.redirect("/home");
}

exports.redirectToHomePage = function(req, res) {
  res.redirect("/home");
}

