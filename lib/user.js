const ToDoItem = require('./todoItem.js');
const ToDo = require("./todoList.js");
class User {
  constructor(name) {
    this.name = name;
    this.todos = {};
  }
  getTodos() {
    return this.todos;
  }
  getTodoTitles() {
    return Object.keys(this.todos);
  }
  getToDoItemsOf(todoList) {
    let todo = this.todos[todoList];
    if(!todo) return [];
    return todo.getAllToDoItems();
  }
  addTodoItem(todoItem, todoList) {
    let todo = this.todos[todoList];
    let newtodoItem = new ToDoItem(todoItem);
    todo.addItem(newtodoItem);
  }
  removeTodoItem(todoItem, todoList) {
    this.todos[todoList.title].removeTodoItem(todoItem);
  }
  editTodoItemText(existingText, newText, todoItem, todoList) {
    todoList = this.todos[todoList.title];
    todoList.editTextOf(existingText, newText);
  }
  addTodo(title,description,todoItems={}) {
    let newTodo = new ToDo(title,description,todoItems);
    this.todos[newTodo.title] = newTodo;
  }
  removeTodo(todoList) {
    delete this.todos[todoList];
  }
  editTitleOf(existingTitle, newTitle,newdescription) {
    let existingTodoList = this.todos[existingTitle]
    let oldToDoItems = this.todos[existingTitle].todoItems;
    this.removeTodo(existingTitle);
    this.addTodo(newTitle,newdescription,oldToDoItems)
  }
}

module.exports = User
