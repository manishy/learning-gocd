const webApp = require('./webApp.js');
const utility  = require("./utility.js");
let app = webApp.create();

app.post("/markAsDone", utility.markAsDone);
app.post("/markAsNotDone", utility.markAsNotDone);
app.post("/editToDoList", utility.editToDoList)
app.post("/deleteToDoList", utility.deleteToDo)
app.post("/addAToDoList", utility.addToDoList);
app.post("/showToDoList", utility.showItemsOfParticularToDoList);
app.post("/addToDoItem", utility.addToDoItem)
app.post('/login', utility.postLogin);
app.get("/", utility.redirectToIndexpage);
app.get('/logout', utility.logoutUser);
app.get('/login', utility.getLogin);
app.get('/home', utility.homePageHandler);
app.get("/loadAllToDoList", utility.sendToDoList);
app.use(utility.logRequest);
app.use(utility.loadUser);
app.addPostProcessor(utility.fileServer);
app.addPostProcessor(utility.requestNotFound);
module.exports = app;
