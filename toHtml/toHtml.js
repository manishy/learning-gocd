const generatePara = function(text){
    return `<p>${text}</p>`;
}

exports.convertIntoListTag = function(text){
  return `<li>${text}</li>`
}

const generateToDoListOf = (user)=>{
    let titles = user.getTodoTitles();
    let html = titles.map(title=>{
        return generatePara(title);
    })
    return html.join("<br>");
}

exports.getToDoList = (todoTitle)=>{
    let todo = `<div id="${todoTitle}">
    <b><u>${todoTitle}:</u><b>
    <br>
    <div id="${todoTitle}items">
    </div>
    <div class="addToDoForm${todoTitle}">
    </div>
    <button id="${todoTitle}" onclick="showToDo(this.id)" name="button">view</button>
    <button id="${todoTitle}" onclick="addToDoItem(this.id)" name="button">addItem</button>
    <button id="${todoTitle}" onclick="editToDoList(this.id)" name="button">edit</button>
    <button id="${todoTitle}" onclick="deleteToDoList(this.id)" name="button">delete</button>
    <hr>
    </div>`;
    return todo;
  }

exports.generateToDoListOf = generateToDoListOf;
