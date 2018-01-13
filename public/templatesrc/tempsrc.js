const showToDo =(title)=>{
  let todoTitle = title;
  title = `title=${title}`;
  let xml = new XMLHttpRequest();
  xml.open("POST","showToDoList");
  let reqListener = function(){
    let allToDoItems = this.responseText;
    let div = document.getElementById(`${todoTitle}items`);
    console.log(div);
    div.innerHTML = allToDoItems;
}
  xml.addEventListener("load",reqListener);
  xml.send(title);
}

const getAddToDoItemForm= function(input1,title){
  let form =
  `${input1}<input id="${title}text" type="text" name="${input1}" value="">
  <button id="${title}" type="button" onclick="submitToDoItem(this.id)">submitToDoItem</button>`;
return form;
}

const submitToDoItem = function(title){
  let text = document.getElementById(`${title}text`).value;
  let postData = `text=${text}&todoList=${title}`;
  let xml = new XMLHttpRequest();
  xml.open("POST","addToDoItem");
  let reqListener = function(){
    showToDo(title);
  }
  xml.addEventListener("load",reqListener);
  xml.send(postData);
}

const addToDoItem = function(title){
  let div = document.getElementsByClassName(`addToDoForm${title}`)[0];
  div.innerHTML = getAddToDoItemForm("text",title);
}

window.onload = function(){
  let xml = new XMLHttpRequest();
  xml.open("GET","loadAllToDoList");
  let reqListener = function(){
    let responseText = this.responseText;
    let div = document.getElementsByClassName("todoList")[0];
    div.innerHTML = responseText;
  }
  xml.addEventListener("load",reqListener);
  xml.send();
}
