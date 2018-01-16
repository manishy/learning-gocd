const ToDoItem = require('./todoItem.js');
const ToDo = require("./todoList.js");
class User {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  getTodos() {
    return this.todos;
  }
  getTodoTitles() {
    return this.todos.map(x=>x.title);
  }
  getToDoItemsTextOf(todoList) {
    let todo = this.todos.find(x=>x.title==todoList);
    return todo.getAllToDoItemText();
  }
  getToDoItemsOf(todoList) {
    let todo = this.todos.find(x=>x.title==todoList);
    return todo.getAllToDoItems();
  }
  addTodoItem(todoItem, todoList) {
    let todo = this.todos.find(x=>x.title==todoList);
    let newtodoItem = new ToDoItem(todoItem);
    todo.addItem(newtodoItem);
  }
  removeTodoItem(todoItem, todoList) {
    let todo = this.todos.find(x=>x.title==todoList);
    todo.removeTodoItem(todoItem);
  }
  editTodoItemText(existingText, newText,todoList) {
    this.todos.find(x=>x.title==todoList).editTextOf(existingText,newText);
  }
  addTodo(title,description,todoItems={}) {
    let newTodo = new ToDo(title,description,todoItems);
    this.todos.push(newTodo);
  }
  removeTodo(todoList) {
    let todos = this.todos;
    let todoIndex = todos.findIndex(x=>x.title==todoList);
    this.todos.splice(todoIndex,1);
  }
  editTitleOf(existingTitle, newTitle,newdescription) {
    this.todos.find(x=>x.title==existingTitle).title = newTitle;
    this.todos.find(x=>x.title==newTitle).description = newdescription;
  }
  markAsDone(title,item){
    this.todos.find(x=>x.title==title).todoItems.find(x=>x.text==item).markAsDone();
  }
  markAsNotDone(title,item){
    this.todos.find(x=>x.title==title).todoItems.find(x=>x.text==item).markAsNotDone();
  }
  isDone(title,item){
    return this.todos.find(x => x.title == title).todoItems.find(x => x.text == item).isDone()
  }
}

module.exports = User
