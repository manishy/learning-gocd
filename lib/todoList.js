class ToDoList {
    constructor (title,description,todoItems={}) {
        this.title = title;
        this.description = description;
        this.todoItems = todoItems;
    }
    getAllToDoItems(){
        return Object.keys(this.todoItems);
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
    done(todoItem){
        let todoItem = this.todoItems[todoItem.text];
        todoItem.status=true;
    }
    notDone(todoItem){
        let todoItem = this.todoItems[todoItem.text];
        todoItem.status=false;
    }
    isDone(todoItem){
        return this.todoItems[todoItem].status;
    }
}

module.exports = ToDoList;
