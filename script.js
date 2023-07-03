let inputAddValue = document.getElementById("addInput");
let buttonAddValue = document.getElementById("addButton");
let responseContainer = document.getElementById("responseDiv");
let initialParagraph = document.getElementById("anyValue");
let getlocalStorage = localStorage.getItem("toDoList:@value");

let toDoValues = [];

const createDivValue = (el) => {
  buttonAddValue.addEventListener("click", () => {
    if (inputAddValue.value != "") {
      toDoValues.push(inputAddValue.value);
      responseContainer.innerHTML = "";
      el.map((element) => {
        let div = document.createElement("div");
        let otherDiv = document.createElement("div");
        otherDiv.classList.add("fas", "fa-pen-to-square");
        let lastIconDiv = document.createElement("div");
        lastIconDiv.classList.add("fas", "fa-trash-can");
        let divIcons = document.createElement("div");
        divIcons.classList.add("marginIcons");
        div.setAttribute("class", "fieldValue");
        let paragraph = document.createElement("p");
        paragraph.classList.add("borderBottom");

        paragraph.append(element);
        div.appendChild(paragraph);
        divIcons.appendChild(otherDiv);
        divIcons.appendChild(lastIconDiv);
        div.appendChild(divIcons);
        responseContainer.appendChild(div);
        return;
      });
    } else {
      alert("Adicione um valor a lista de tarefas");
      return;
    }
    localStorage.setItem("toDoList:@value", JSON.stringify(toDoValues));
  });
};
createDivValue(toDoValues);

window.onload = () => {
  toDoValues = JSON.parse(getlocalStorage);
};
