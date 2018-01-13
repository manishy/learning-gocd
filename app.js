const webApp = require('./webApp.js');
const fs = require('fs');
let loginLink = `<a id="login" href="login">login to add todo</a>`
const loginPage = fs.readFileSync("./public/login.html","utf8");
const homePage = fs.readFileSync("./public/index.html","utf8");
let todoListTemplate = fs.readFileSync("./templates/todoListTitle.html","utf8");
let todoItemTemp = fs.readFileSync("./templates/todoItem.html","utf8");
let addtodoForm = fs.readFileSync("./public/addToDoForm.html","utf8");
const toHtml = require("./toHtml/toHtml.js");
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
        content = content.replace("addAToDo","");
        res.write(content);
        res.end();
    }
}
const sendToDoList = (req,res)=>{
  if(req.user){
    let titles = user.getTodoTitles();
    let html = ""
    titles.forEach(title=>html+=toHtml.getToDoList(title));
    res.setHeader("Content-Type","text/html");
    res.write(html);
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
  let content = homePage.replace("placeHolder",todoListTemplate);
  content = content.replace("name",user.name);
  let logout = `<a href="logout"> Logout </a>`
  content = content.replace("home/logout",logout);
  content = content.replace("addAToDo",addtodoForm);
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
  res.write(JSON.stringify(contentToWrite));
  res.end();
}
const showItemsOfParticularToDoList = function(req,res){
  let titleOfToDoList = req.body.title;
  let allToDoItems = user.getToDoItemsOf(titleOfToDoList);
  allToDoItems = allToDoItems.map(toHtml.convertIntoListTag).join("<br>");
  allToDoItems = todoItemTemp.replace("todoItemsHolder",allToDoItems);
  res.setHeader("Content-Type","text/html");
  res.write(allToDoItems);
  res.end();
}


const addToDoItem = function(req,res){
  let todoItem = req.body.text;
  let todoList = req.body.todoList;
  user.addTodoItem(todoItem,todoList);
  res.write(todoItem);
  res.end();
}

const addToDoList = function(req,res){
  let title = req.body.title;
  let description = req.body.description;
  user.addTodo(title,description);
  res.redirect("/home");
}

const deleteToDo = function(req,res){
  let title = req.body.title;
  user.removeTodo(title);
  res.redirect("/home");
}
const editToDoList = function(req,res){
  let oldTitle = req.body.previousTitle;
  let newTitle = req.body.newTitle;
  let description = req.body.description;
  user.editTitleOf(oldTitle,newTitle,description);
  console.log(user);
  res.end();
}
app.post("/editToDoList",editToDoList)
app.post("/deleteToDoList",deleteToDo)
app.post("/addAToDoList",addToDoList);
app.post("/showToDoList",showItemsOfParticularToDoList);
app.post("/addToDoItem",addToDoItem)
app.get("/",redirectToIndexpage);
app.get('/logout',logoutUser);
app.post('/login',postLogin);
app.get('/login',getLogin);
app.get('/home',homePageHandler);
app.use(logRequest);
app.use(loadUser);
app.addPostProcessor(fileServer);
app.addPostProcessor(requestNotFound);
app.get("/loadAllToDoList",sendToDoList);
module.exports = app;
