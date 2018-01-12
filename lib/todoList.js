class todoList {
    constructor (title,description) {
        this.title = title;
        this.description = description;
        this.todoItems = {};
    }
    addItem(todoItem){
        this.todoItems[todoItem.text]=todoItem;
    }
    removeTodoItem(todoItem){
        delete this.todoItems[todoItem.text];
    }
    editTextOf(existingtext,newtext){
        let existingTodoItem = this.todoItems[existingtext];
        existingTodoItem[existingtext]=newtext;
        this.removeTodoItem(existingTodoItem);
        this.addItem(existingTodoItem);
    }
}

module.exports = todoList;