let a = document.getElementById("todoItemsContainer");
let addTodoButt = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");


function getItemFromLocal()
{
    let fromLocal=localStorage.getItem("todoList");
    let parse = JSON.parse(fromLocal);
    if(parse === null)
    {
        return [];
    }
    else
    {
        return parse;
    }
}

let todoList = getItemFromLocal();

saveButton.onclick = function()
{
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

addTodoButt.onclick = function()
{
    onAddTodo();
}


function onTodoStatusChange(unique,labelId, todoId)
{
    let checkboxElement = document.getElementById(unique);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked"); 

    let todoObjectIndex = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];
    if(todoObject.isChecked === true)
    {
        todoObject.isChecked = false;
    }
    else
    {
        todoObject.isChecked = true;
    }
}

function onDelete(todoId)
{
    let todoElement = document.getElementById(todoId);
    a.removeChild(todoElement);
    let deleteindexElement = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    todoList.splice(deleteindexElement,1)
}

function createAndAppend(todo)
{
let labelId = "label" + todo.uniqueNo;
let unique = "checkbox" + todo.uniqueNo;
let todoId = "todo" + todo.uniqueNo;

let list = document.createElement('li');
list.classList.add("todo-item-container","d-flex","flex-row");
list.id = todoId;
a.appendChild(list);

let inp = document.createElement('input');
inp.type = "checkbox";
inp.id = unique;
inp.checked = todo.isChecked;
inp.classList.add("checkbox-input");
list.appendChild(inp);

let cont = document.createElement('div');
cont.classList.add("label-container","d-flex","flex-row");
list.appendChild(cont);

let label = document.createElement('label');
label.setAttribute("for",unique);
label.classList.add("checkbox-label");
label.id = labelId;
label.textContent = todo.text;
if (todo.isChecked === true)
{
    label.classList.add("checked");
}
label.onclick = function()
{
    onTodoStatusChange(unique,labelId,todoId);
}

cont.appendChild(label);


let fontawe = document.createElement('i');
fontawe.classList.add("far","fa-trash-alt","delete-icon","delete-icon-container");
fontawe.onclick = function()
{
    onDelete(todoId);
}
cont.appendChild(fontawe);
}

function onAddTodo()
{
    let todosCount = todoList.length;
    todosCount = todosCount + 1;
    let userInput = document.getElementById("todoUserInput");
    let userValue = userInput.value;

    if (userValue === "")
    {
        alert("Enter valid Text");
        return;
    }

    let newTodo = {
        text : userValue,
        uniqueNo : todosCount,
        isChecked : false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    userInput.value = "";
}


for (let eachitem of todoList)
{
	createAndAppend(eachitem);
}