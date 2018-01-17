const showToDo = (title, force = false) => {
  let todoTitle = title;
  title = `title=${title}`;
  let reqListener = function () {
    let allToDoItems = this.responseText;
    let div = document.getElementById(`${todoTitle}items`);
    if (!div.innerHTML.trim() || force) {
      div.innerHTML = allToDoItems;
      return;
    }
    div.innerHTML = "";
  }
  let options = {
    method: "POST",
    url: "showToDoItems",
    data: title
  }
  doXmlReq(options, reqListener);
}

const doXmlReq = function (options, reqListener) {
  let xml = new XMLHttpRequest();
  xml.open(options.method, options.url);
  xml.addEventListener("load", reqListener);
  xml.send(options.data);
}

const getAddToDoItemForm = function (input1, title) {
  let form =
    `${input1}<input id="${title}text" type="text" name="${input1}" value="">
  <button id="${title}" type="button" onclick="submitToDoItem(this.id)">submit</button>`;
  return form;
}

const submitToDoItem = function (title) {
  let text = document.getElementById(`${title}text`).value;
  let postData = `text=${text}&todoList=${title}`;
  let options = {
    method: "POST",
    url: "addToDoItem",
    data: postData
  }
  doXmlReq(options, () => {
    showToDo(title);
  });
}

const addToDoItem = function (title) {
  let div = document.getElementsByClassName(`addToDoForm${title}`)[0];
  if (div.style.visibility == "visible") {
    div.style.visibility = "hidden";
    return;
  }
  div.style.visibility = "visible";
  div.innerHTML = getAddToDoItemForm("text", title);
}

const deleteToDoList = function (title) {
  let postData = `title=${title}`;
  let options = {
    method: "POST",
    url: "deleteToDoList",
    data: postData
  }
  doXmlReq(options, () => {
    let divToDelet = document.getElementById(title);
    divToDelet.remove();
  })
}

const getForm = function (inputs, title) {
  let form = "";
  inputs.forEach(input => {
    form += `${input}<input id="${title + input}" type="text" name="${input}" value="">`;
  })
  return form + `<button id="${title}" type="button" onclick="
  edit(this.id)">edit</button>`;
}

const edit = function (title) {
  let newTitle = document.getElementById(`${title}title`).value;
  let newDescription = document.getElementById(`${title}description`).value;
  let postData = `previousTitle=${title}&newTitle=${newTitle}
  &description=${newDescription}`;
  const options = {
    method: "POST",
    url: "editToDoList",
    data: postData
  }
  doXmlReq(options, function(){
    let oldDiv = document.getElementById(title);
    let parentOfOld = oldDiv.parentElement;
    let newDiv = this.responseText;
    parentOfOld.innerHTML=newDiv;
  })
}

const editToDoList = function (title) {
  let form = getForm(["title", "description"], title);
  let div = document.getElementsByClassName(`addToDoForm${title}`)[0];
  if (div.style.visibility == "visible") {
    div.style.visibility = "hidden";
    return;
  }
  div.style.visibility = "visible";
  div.innerHTML = form;
}

const markAsNotDone = function (titleAndItem) {
  let title = titleAndItem.split("__")[0];
  let item = titleAndItem.split("__")[1];
  let postData = `title=${title}&item=${item}`;
  const options = {
    method: "POST",
    url: "markAsNotDone",
    data: postData
  }
  doXmlReq(options, () => {
    showToDo(title, true);
  });
}

const markAsDone = function (titleAndItem) {
  let title = titleAndItem.split("__")[0];
  let item = titleAndItem.split("__")[1];
  let postData = `title=${title}&item=${item}`;
  const options = {
    method: "POST",
    url: "markAsDone",
    data: postData
  }
  doXmlReq(options, () => {
    showToDo(title, true);
  });
}

window.onload = function () {
  let options = {
    method: "POST",
    url: "loadAllToDoList",
    data: ""
  }
  let reqListener = function () {
    let responseText = this.responseText;
    console.log(responseText);
    let div = document.getElementsByClassName("todoList")[0];
    div.innerHTML = responseText;
  }
  doXmlReq(options, reqListener);
}
