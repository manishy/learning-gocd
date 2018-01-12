class ToDoItem {
    constructor (text) {
    this.text = text;
    this.status=false;    
    }
    isDone(){
        return this.status;
    }
    markAsDone(){
        this.status = true;
    }
    markAsNotDone(){
        this.status=false;
    }
}

module.exports = ToDoItem;