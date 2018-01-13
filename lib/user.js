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
    return todo.getAllToDoItems();
  }
  addTodoItem(todoItem, todoList) {
    let title = todoList.title;
    let todo = this.todos[title];
    todo.addItem(todoItem);
  }
  removeTodoItem(todoItem, todoList) {
    this.todos[todoList.title].removeTodoItem(todoItem);
  }
  editTodoItemText(existingText, newText, todoItem, todoList) {
    let todoList = this.todos[todoList.title];
    todoList.editTextOf(existingText, newText);
  }
  addTodo(todoList) {
    this.todos[todoList.title] = todoList;
  }
  removeTodo(todoList) {
    delete this.todos[todoList.title];
  }
  editTitleOf(existingTitle, newTitle) {
    let existingTodoList = this.todos[existingTitle];
    this.removeTodo(existingTitle);
    existingTodoList[existingTitle] = newTitle;
    this.addTodo(existingTodoList);
  }
}

module.exports = User
