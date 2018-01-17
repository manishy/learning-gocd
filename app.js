const webApp = require('./webApp.js');
const fs = require('fs');
const utility  = require("./utility.js");
let app = webApp.create();
let CompositeHandler = require("./handlers/composite_handler.js");
let GetLoginHandler = require("./handlers/get_login_handler.js");
let PostLoginHandler = require("./handlers/post_login_handler.js");
let TodoActionHandler = require("./handlers/todo_action_handler.js");
let LoadUserHandler = require("./handlers/load_user_handler.js");
const HomePageHandler = require("./handlers/home_page_handler.js");
let compositeHandler = new CompositeHandler();
let handler = new TodoActionHandler();
compositeHandler.addHandler(handler);
app.post('/login', new PostLoginHandler().getRequestHandler());
app.get("/", utility.redirectToIndexpage);
app.get('/logout', utility.logoutUser);
app.get('/login', new GetLoginHandler(fs, "./public/login.html").getRequestHandler());
app.get('/home', new HomePageHandler().getRequestHandler());
app.use(utility.logRequest);
app.use(new LoadUserHandler().getRequestHandler());
app.use(compositeHandler.getRequestHandler());
app.addPostProcessor(utility.fileServer);
app.addPostProcessor(utility.requestNotFound);
module.exports = app;
