const User = require('../lib/user.js');
const ToDoList = require('../lib/todoList.js');
const chai = require('chai');
const assert = chai.assert;

describe('user', () => {
    describe('adds a todoList', () => {
        it('should add a todo to users existing todos', (done) => {
            let user = new User("ashish");
            let newTodo = new ToDoList("at Home","some home stuff")
            user.addTodo("at Home","some home stuff");
            let todos = user.todos["at Home"];
            assert.deepEqual(todos,newTodo);
            done();
        });
    });
    describe('removes a todoList', () => {
        it('should remove a todolist from users list of todos ', (done) => {
            let user = new User("ashish");
            let newTodo = new ToDoList("at Home","some home stuffs")
            user.addTodo("at Home","some home stuffs");
            let todos = user.todos["at Home"];
            assert.deepEqual(todos,newTodo);
            user.removeTodo(newTodo);
            assert.notExists(user.todos["at Home"]);
            done();
        });
    });
    describe('edit a title', () => {
        it('should edit title of existing todo ', (done) => {
            let user = new User("ashish");
            let newTodo = new ToDoList("at Home","some home stuffs")
            user.addTodo("at Home","some home stuffs");
            user.editTitleOf("at Home","at Office");
            let todos = user.todos["at Home"];
            assert.notInclude(user.todos,newTodo);
            done();
        });
    });
});
