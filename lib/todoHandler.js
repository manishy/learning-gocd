const User = require('./user.js')
const TodoItem = require('./todoItem.js');
const ToDoList = require('./todoList.js');
let ashish =  new User("ashishm");
ashish.addTodo("todo at home","home stuff");
ashish.addTodo("office","home stuff");
ashish.addTodoItem("buy cloths","todo at home");
ashish.addTodoItem("buy some","todo at home");
ashish.addTodoItem("file sign","office");
ashish.addTodoItem("pay clerk","office");
module.exports = ashish;
