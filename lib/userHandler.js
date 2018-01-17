const User = require("./user.js");
class TodoApp {
  constructor() {
    this.users = {};
  }
  addUser(user) {
    this.users[user.name] = user;
  }
  removeUser(user) {
    delete this.users[user.name];
  }
  getUser(userName){
    return this.users[userName];
  }
  retrive(data){
    let self = this;
    let appData = JSON.parse(data);
    let users = Object.keys(appData.users);
    users.forEach(function(user){
      let newUser = new User(user);
      let todoList = appData.users[user].todos;
      todoList.forEach(function(todo){
        newUser.addTodo(todo.title,todo.description);
        todo.todoItems.forEach(function(item){
          newUser.addTodoItem(item.text,todo.title,item.status);
        })
      })
      self.addUser(newUser);
    })
  }
}

module.exports = TodoApp;
