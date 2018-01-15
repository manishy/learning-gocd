const ToDoList = require('../lib/todoList.js');
const ToDoItem = require('../lib/todoItem.js');

const chai = require('chai');
const assert = chai.assert;

describe('todoList', () => {
    describe('adds a todoItem', () => {
        it('should add a todoItem to users list', () => {
            let todoList = new ToDoList("at Home","just home stuffs",{});
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            let items = todoList.getAllToDoItemText();
            assert.include(items,"buy cloths");
        });
    });
    describe('removes a todoList', () => {
        it('should remove a todolist from users list of todos ', () => {
            let todoList = new ToDoList("at Home","just home stuffs");
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            todoList.removeTodoItem(todoItem.text);
            assert.notExists(todoList.todoItems["at Home"]);
        });
    });
    describe('edit a title', () => {
        it('should edit title of existing todo ', () => {
            let todoList = new ToDoList("at Home","just home stuffs");
            let todoItem = {text:"buy cloths"};
            todoList.addItem(todoItem);
            todoList.editTextOf("buy cloths","buy soap");
            let replacedItem = todoList.todoItems["buy cloths"];
            assert.notInclude(todoList.todoItems,replacedItem);
        });
    });
    describe('sets status as done', () => {
        it('should set a status of given item as done ', () => {
            let todoList = new ToDoList("at Home","just home stuffs");
            todoList.addItem(new ToDoItem("buy cloths"));
            todoList.done("buy cloths");
            assert.isOk(todoList.isDone("buy cloths"));
        });
    });
});
