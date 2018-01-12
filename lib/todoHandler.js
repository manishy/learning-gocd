const User = require('./user.js')
const TodoItem = require('./todoItem.js');
const ToDoList = require('./todoList.js');
let ashish =  new User("ashishm");
let home = new ToDoList("home","home stuff");
let office = new ToDoList("office","home stuff");
ashish.addTodo(home);
ashish.addTodo(office);
ashish.addTodoItem(new TodoItem("buy cloths"),home);
ashish.addTodoItem(new TodoItem("buy some"),home);
module.exports = ashish;