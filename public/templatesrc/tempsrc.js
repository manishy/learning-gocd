const showToDo =(title)=>{
  let title = `title=${title}`;
  let xml = new XMLHttpRequest();
  xml.open("POST","/showToDoList");
  let reqListener = ()=>{
    let responseText = this.responseText;
    let allToDoItems = responseText["todoItems"];
    let div = document.getElementById(title);
    console.log(title);
    allToDoItems.foEach((todoItem)=>{
      let item = document.createElement("p");
      div.appendChild(item);
  });
}
  xml.addEventListener("load",reqListener);
  xml.send(title);
}
