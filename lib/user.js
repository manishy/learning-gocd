class user {
    constructor (name) {
        this.name = name;
        this.todos = {};
    }
    addTodo(todoList){
        this.todos[todoList.title]=todoList;
    }
    removeTodo(todoList){
        delete this.todos[todoList.title];
    }
    editTitleOf(existingTitle,newTitle){
        let existingTodoList = this.todos[existingTitle];
        this.removeTodo(existingTitle);
        existingTodoList[existingTitle]=newTitle;
        this.addTodo(existingTodoList);
    }
}

module.exports = user
