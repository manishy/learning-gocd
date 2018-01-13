const ToDoList = require('../lib/todoList.js');
const chai = require('chai');
const assert = chai.assert;

describe('todoList', () => {
    describe('adds a todoItem', () => {
        it('should add a todoItem to users list', (done) => {
            let todoList = new ToDoList("at Home","just home stuffs",{});
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            assert.exists(todoList.todoItems["buy cloths"])
            done();
        });
    });
    describe('removes a todoList', () => {
        it('should remove a todolist from users list of todos ', (done) => {
            let todoList = new ToDoList("at Home","just home stuffs");
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            todoList.removeTodoItem(todoItem);
            assert.notExists(todoList.todoItems["at Home"]);
            done();
        });
    });
    describe('edit a title', () => {
        it('should edit title of existing todo ', (done) => {
            let todoList = new ToDoList("at Home","just home stuffs");
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            todoList.editTextOf("buy cloths","buy soap");
            let replacedItem = todoList.todoItems["buy cloths"];
            assert.notInclude(todoList.todoItems,replacedItem);
            done();
        });
    });
    describe.skip('sets status as done', () => {
        it('should set a status of given item as done ', (done) => {
            let todoList = new ToDoList("at Home","just home stuffs");
            let todoItem = {text:"buy cloths",isDone:()=>true,status:true};
            todoList.addItem(todoItem);
            todoList.done(todoItem);
            assert.isOk(todoList.isDone(todoItem));
            done();
        });
    });
});
