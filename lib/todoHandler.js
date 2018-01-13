const User = require('./user.js')
const TodoItem = require('./todoItem.js');
const ToDoList = require('./todoList.js');
let ashish =  new User("ashishm");
let home = new ToDoList("todo at home","home stuff");
let office = new ToDoList("office","home stuff");
ashish.addTodo(home);
ashish.addTodo(office);
ashish.addTodoItem("buy cloths","todo at home");
ashish.addTodoItem("buy some","todo at home");
ashish.addTodoItem("file sign","office");
ashish.addTodoItem("pay clerk","office");
module.exports = ashish;
