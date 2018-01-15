class ToDoList {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoItems = [];
  }
  getAllToDoItems() {
    return this.todoItems;
  }
  getAllToDoItemText() {
    return this.todoItems.map(x => x.text);
  }
  addItem(todoItem) {
    this.todoItems.push(todoItem);
  }
  removeTodoItem(todoItem) {
    let items = this.todoItems;
    let itemIndex = items.findIndex(x => x.text == todoItem);
    this.todoItems.splice(itemIndex, 1);
  }
  editTextOf(existingtext, newtext) {
    this.todoItems.find(x => x.text == existingtext).text = newtext;
  }
  done(todoItem) {
    this.todoItems.find(x => x.text == todoItem).markAsDone();
  }
  notDone(todoItem) {
    this.todoItems.find(x => x.text == todoItem).markAsNotDone();
  }
  isDone(todoItem) {
    return this.todoItems.find(x => x.text == todoItem).isDone();
  }
}

module.exports = ToDoList;
