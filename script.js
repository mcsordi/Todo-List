let inputAddValue = document.getElementById("addInput");
let buttonAddValue = document.getElementById("addButton");
let responseContainer = document.getElementById("responseDiv");
let initialParagraph = document.getElementById("anyValue");

let toDoValues = [];

const createDivValue = (el) => {
  for (element of el) {
    let div = document.createElement("div");
    div.classList.add("fieldValue");
    let trashIcon = document.createElement("div");
    trashIcon.classList.add("fas", "fa-pen-to-square");
    let editIcon = document.createElement("div");
    editIcon.classList.add("fas", "fa-trash-can");
    let iconsDiv = document.createElement("div");
    iconsDiv.classList.add("marginIcons");
    let paragraph = document.createElement("p");
    paragraph.classList.add("borderBottom");
    paragraph.append(element);
    iconsDiv.appendChild(trashIcon);
    iconsDiv.appendChild(editIcon);
    div.appendChild(paragraph);
    div.appendChild(iconsDiv);
    responseContainer.appendChild(div);
  }
  localStorage.setItem("todoList:@values", JSON.stringify(toDoValues));

  const doTaskOfList = () => {
    let elementP = [...document.querySelectorAll("p")];
    elementP.map((ele) => {
      ele.addEventListener("click", (evt) => {
        ele.classList.toggle("doTask");
      });
    });
  };

  const saveDoTasks = () => {
    let positionDo = [];
    let elementDo = [];
    let pTasks = [...document.querySelectorAll("p")];
    pTasks.map((element, i) => {
      element.addEventListener("click", (evt) => {
        positionDo = [];
        elementDo = [];
        pTasks.filter((el, index) => {
          elementDo.push(el.classList.contains("doTask"));
          positionDo.push(index);
        });
        localStorage.setItem("VerifyDoElement", JSON.stringify(elementDo));
        localStorage.setItem("VerifyDoPosition", JSON.stringify(positionDo));
      });
    });
  };
  const removeTasks = () => {
    let otherArray = [];
    otherArray = toDoValues;
    let trashElement = [...document.querySelectorAll(".fa-trash-can")];
    trashElement.map((element) => {
      element.addEventListener("click", (evt) => {
        toDoValues = toDoValues.filter((el) => {
          return (
            el != evt.target.parentNode.parentNode.firstElementChild.innerHTML
          );
        });
        localStorage.setItem("todoList:@values", JSON.stringify(toDoValues));

        evt.target.parentNode.parentNode.remove();
        let textElement = [...document.querySelectorAll("p")];

        localStorage.setItem(
          "VerifyDoElement",
          JSON.stringify(
            textElement.map((element) => {
              return element.classList.contains("doTask");
            })
          )
        );
        saveDoTasks();
        if (toDoValues.length == 0) {
          responseContainer.innerHTML = `<p class="initValue">Your list don't have any task, please add the first task</p>`;
        }
      });
    });
  };
  const reloadDoTasks = () => {
    let doTasks = JSON.parse(localStorage.getItem("VerifyDoElement"));
    let allParagraphs = [...document.querySelectorAll("p")];

    doTasks.filter((el, index) => {
      if (el == true) {
        allParagraphs.filter((element, idx) => {
          if (idx == index) {
            element.classList.add("doTask");
          }
        });
      }
    });
  };

  doTaskOfList();
  saveDoTasks();
  removeTasks();
  reloadDoTasks();
};

buttonAddValue.addEventListener("click", () => {
  if (inputAddValue.value != "") {
    responseContainer.innerHTML = "";
    toDoValues.push(inputAddValue.value);
    createDivValue(toDoValues);
    return;
  } else {
    alert("Enter a value in your todo List");
  }
  saveDoTasks();
});
let someValue = [];
let getTodoValues = JSON.parse(localStorage.getItem("todoList:@values"));
let trueElements = JSON.parse(localStorage.getItem("VerifyDoElement"));
window.addEventListener("load", () => {
  someValue = trueElements;
  if (toDoValues.length == 0 && getTodoValues != null) {
    responseContainer.innerHTML = "";
    toDoValues = getTodoValues;
    createDivValue(toDoValues);
  }
  if (toDoValues.length == 0) {
    responseContainer.innerHTML = `<p class="initValue">Your list don't have any task, please add the first task</p>`;
  }
});
