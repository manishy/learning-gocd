const fs = require('fs');
exports.getContent = function (path) {
  return fs.readFileSync(path, "utf8");
}
const homePage = exports.getContent("./templates/home");
let todoListTemplate = exports.getContent("./templates/todoListTitle");
let addtodoForm = exports.getContent("./templates/addToDoForm");

let toS = o => JSON.stringify(o, null, 2);
let data = exports.getContent("data/data.json");
let ToDoApp = require("./lib/userHandler.js");
let todoApp = new ToDoApp();
todoApp.retrive(data);

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

exports.fileServer = function(req, res) {
  let path = 'public' + req.url;
  if (isGetRequest(req)) {
    try {
      let data = exports.getContent(path);
      res.setHeader("Content-Type", getContentType(path));
      res.statusCode = 200;
      res.write(data);
      res.end()
    } catch (e) {
      return;
    };
  };
}

exports.replace = function (content, newContents) {
  let oldContents = ["placeHolder", "name", "home/logout", "addAToDo"];
  oldContents.forEach((element, index) => {
    content= content.replace(element, newContents[index]);
  });
  return content;
}

exports.generateHomePageFor = (user) => {
  let logout = `<a href="logout"> Logout </a>`;
  let html = exports.replace(homePage,[todoListTemplate,user.name,logout,addtodoForm]);
  return html;
}

exports.redirectToIndexpage = function(req, res) {
  res.redirect("/home");
}

exports.redirectToHomePage = function(req, res) {
  res.redirect("/home");
}

