const webApp = require('./webApp.js');
const fs = require('fs');
let loginLink = `<a id="login" href="login">login to add todo</a>`
const loginPage = fs.readFileSync("./public/login.html","utf8");
const homePage = fs.readFileSync("./public/index.html","utf8");
const toHtml = require("./toHtml/toHtml.js");
let todoListTemplate = fs.readFileSync("./templates/todoListTitle.html","utf8");
const user = require('./lib/todoHandler.js');
let app = webApp.create();

let toS = o => JSON.stringify(o, null, 2);

const logRequest = (req, res) => {
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`, ''
  ].join('\n');
  fs.appendFile('./logs.txt', text, () => {});
  console.log(`${req.method} ${req.url}`);
};

let registered_users = [{userName:'ashishm',name:'ashish mahindrakar'}];

const isGetRequest = function(req){
  return req.method=="GET";
}

const getContentType=function(filePath){
    let contentTypes = {
      '.js':'text/javascript',
      '.html':'text/html',
      '.css':'text/css',
      '.jpeg':'image/jpeg',
      '.txt':'text/plain',
      '.pdf':'application/pdf',
      '.jpg':'image/jpg',
      '.gif':'image/gif',
      '.ico':"image/ico"
    }
    let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
    return contentTypes[fileExtension];
  }

const requestNotFound = function(req,res){
  let url = req.url;
  res.statusCode = 404;
  res.write(`${url} Not Found`);
  res.end()
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const isPost = function(req){
  return req.method == "POST";
}


const getLogin =(req,res)=>{
  res.setHeader('Content-type','text/html');
  res.write(req.cookies.message||"");
  res.write(loginPage);
  res.end();
}


const logoutUser = function(req,res){
  res.setHeader('Set-Cookie', [`message=login failed; Max-Age=5`, `sessionid=0;Max-Age=5`]);
  if(req.user) delete req.user.sessionid;
  res.redirect('/home');
}

const postLogin = function(req,res){
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  let date = new Date();
  let sessionid = date.getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}

const homePageHandler = function(req,res){
    if(req.user){
        let content = generateHomePageFor(user);
        res.setHeader("Content-Type","text/html");
        res.write(content);
        res.end();
    }else{
        let content = homePage.replace("placeHolder",loginLink);
        content = content.replace("name","");
        content = content.replace("home/logout","");        
        res.write(content);
        res.end();
    }
}

let fileServer = function(req, res) {
  let path = 'public' + req.url;
  if (isGetRequest(req)) {
    try {
      let data = fs.readFileSync(path);
      res.setHeader("Content-Type",getContentType(path));
      res.statusCode = 200;
      res.write(data);
      res.end()
    } catch (e) {
      return;
    };
  };
}

const generateHomePageFor =(user)=>{
    let title = user.getTodoTitles()[0];
    let todoTemp = todoListTemplate.replace(/todoList1/g,title);
    let content = homePage.replace("placeHolder",todoTemp);
    content = content.replace("name",user.name);
    let logout = `<a href="logout"> Logout </a>`
    content = content.replace("home/logout",logout);
    return content;
}

const redirectToIndexpage = function(req,res){
  res.redirect("/home");
}

const redirectToHomePage = function(req,res){
  res.redirect("/home");
}

const sentToDoList = (req,res)=>{
    let titleOfToDoList = req.body.title;
    let allToDoItems = user.getToDoItemsOf(titleOfToDoList);
    let contentToWrite = {
        title:titleOfToDoList,
        todoItems:allToDoItems
    }
    res.setHeader("Content-Type","application/json");
    console.log(contentToWrite);
    res.write(JSON.stringify(contentToWrite));
    res.end();
}

app.get("/",redirectToIndexpage);
app.get('/logout',logoutUser);
app.post('/login',postLogin);
app.post('/showToDoList',sentToDoList);
app.get('/login',getLogin);
app.get('/home',homePageHandler);
app.use(logRequest);
app.use(loadUser);
app.addPostProcessor(fileServer);
app.addPostProcessor(requestNotFound);
module.exports = app;