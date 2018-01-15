const fs = require("fs");
const itemTemp = fs.readFileSync("templates/todoItem.html","utf8");
exports.convertIntoListTag = function(text){
  return `<li>${text}</li>`
}


exports.toInputTag = function(title,toDoItem){
  if(toDoItem.isDone()) {
    return `<input type="text" class="strikethrough"id=${toDoItem} ${title} disabled value="${toDoItem.text}">`;
  } 
    return `<input type="text" id=${toDoItem} ${title} disabled value="${toDoItem.text}">`;
}

exports.item = (title,toDoItems)=>{
  return toDoItems.map((item)=>{
    let temp = exports.toInputTag(title,item);
    let htmlItem = itemTemp.replace(/item_Holder/,temp);
    htmlItem = htmlItem.replace(/listAndItem/g,`${title}__${item.text}`);
    return htmlItem;
  })
}

exports.getToDoList = (todoTitle)=>{
    let todo = `<div id="${todoTitle}">
    <b><u>${todoTitle}:</u><b>
    <br>
    <div id="${todoTitle}items">
    </div>
    <div style="visibility=hidden"class="addToDoForm${todoTitle}">
    <p><p>
    </div>
    <button id="${todoTitle}" onclick="showToDo(this.id)" name="button">view</button>
    <button id="${todoTitle}" onclick="addToDoItem(this.id)" name="button">addItem</button>
    <button id="${todoTitle}" onclick="editToDoList(this.id)" name="button">edit</button>
    <button id="${todoTitle}" onclick="deleteToDoList(this.id)" name="button">delete</button>
    <hr>
    </div>`;
    return todo;
  }
