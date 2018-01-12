const generatePara = function(text){
    return `<p>${text}</p>`;
}

const generateToDoListOf = (user)=>{
    let titles = user.getTodoTitles();
    let html = titles.map(title=>{
        return generatePara(title);
    })
    return html.join("<br>");
}

exports.generateToDoListOf = generateToDoListOf;