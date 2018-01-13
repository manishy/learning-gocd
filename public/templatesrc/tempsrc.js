const showToDo =(title)=>{
  let todoTitle = title;
  title = `title=${title}`;
  console.log(title);
  let xml = new XMLHttpRequest();
  xml.open("POST","showToDoList");
  let reqListener = function(){
    let allToDoItems = this.responseText;
    let div = document.getElementsByClassName(todoTitle)[0];
    div.innerHTML = allToDoItems;
}
  xml.addEventListener("load",reqListener);
  xml.send(title);
}

const getAddToDoListForm= function(input1,input2,fn){
  let form =
  `${input1}<input type="text" name="${input1}" value="">
  ${input2}<input type="text" name="${input2}" value="">
  <button type="button" onclick="fn()">${fn}</button>`;
return form;
}

const addToDoList = function(title){
  let div = document.getElementsByClassName(`addToDoForm${title}`)[0];
  div.innerHTML = getAddToDoListForm("title","description","submitToDo");
}
const submitToDo = function(){
  let title = document.getElementsByName("title")[0].value;
  let description = document.getElementsByName("description")[0].value;
  let postData = `title=${title}&description=${description}`;
  let xhr = new XMLHttpRequest();
  xml.open("POST","showToDoList");
  let reqListener = function(){
    let responseText = JSON.parse(this.responseText);
    let div = document
  }
  xml.addEventListener("load",reqListener);
  xml.send(postData);
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
