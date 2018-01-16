class ToDoItem {
  constructor(text,status=false) {
    this.text = text;
    this.status = status;
  }
  isDone() {
    return this.status;
  }
  markAsDone() {
    this.status = true;
  }
  markAsNotDone() {
    this.status = false;
  }
}

module.exports = ToDoItem;
