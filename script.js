let inputAddValue = document.getElementById("addInput");
let buttonAddValue = document.getElementById("addButton");
let responseContainer = document.getElementById("responseDiv");
let initialParagraph = document.getElementById("anyValue");
let editModalofValue = document.getElementById("editModal");
let closeModal = document.getElementById("closeEditModal");
let editButton = document.getElementById("buttonEdit");

let toDoValues = [];
let editToDoValues = [];

const createDivValue = (el) => {
  for (element of el) {
    let div = document.createElement("div");
    div.classList.add("fieldValue");
    let trashIcon = document.createElement("div");
    trashIcon.classList.add("fas", "fa-pen-to-square");
    let editIcon = document.createElement("div");
    editIcon.classList.add("fas", "fa-trash-can");
    let paragraph = document.createElement("p");
    paragraph.classList.add("borderBottom");
    paragraph.append(element);
    div.appendChild(paragraph);
    div.appendChild(trashIcon);
    div.appendChild(editIcon);
    responseContainer.appendChild(div);
  }
  localStorage.setItem("todoList:@values", JSON.stringify(el));

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
    let trashElement = [...document.querySelectorAll(".fa-trash-can")];
    let getDoList = JSON.parse(localStorage.getItem("todoList:@values"));

    trashElement.map((element) => {
      element.addEventListener("click", (evt) => {
        toDoValues = getDoList.filter((el) => {
          return el != evt.target.parentNode.firstElementChild.innerHTML;
        });
        localStorage.setItem("todoList:@values", JSON.stringify(toDoValues));

        evt.target.parentNode.remove();
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
    addEditEventListeners();
  };
  const editValue = () => {
    let editInputValue = document.getElementById("editInput");
    let editIcons = [...document.querySelectorAll(".fa-pen-to-square")];
    let editOfValue = document.getElementById("returnValue");

    editIcons.map((element, index) => {
      element.addEventListener("click", (evt) => {
        editInputValue.value = "";
        let getValues = JSON.parse(localStorage.getItem("todoList:@values"));
        let clickElementValue = evt.target.parentNode.innerText;
        editModalofValue.style.display = "flex";
        editOfValue.innerHTML = clickElementValue;
        editInputValue.focus();
        editToDoValues = toDoValues;
        editButton.addEventListener("click", () => {
          if (editInputValue.value == "") {
            editInputValue.placeholder = "Valor não pode ser vazio";
          } else {
            editInputValue.placeholder = "";
            editToDoValues = [];
            getValues.filter((el, idx) => {
              if (index != idx) {
                editToDoValues.push(el);
              } else {
                editToDoValues.push(editInputValue.value);
              }
              localStorage.setItem(
                "todoList:@values",
                JSON.stringify(editToDoValues)
              );
              let getElementValues = JSON.parse(
                localStorage.getItem("todoList:@values")
              );
              editModalofValue.style.display = "none";
              responseContainer.innerHTML = "";
              createDivValue(getElementValues);
            });
          }
        });
      });
    });

    closeModal.addEventListener("click", () => {
      editModalofValue.style.display = "none";
      editInputValue.value = "";
      editInputValue.placeholder = "";
    });
  };

  const addEditEventListeners = () => {
    let editIcons = [...document.querySelectorAll(".fa-pen-to-square")];
    let pElements = [...document.querySelectorAll("p")];

    editIcons.map((el, idx) => {
      el.addEventListener("click", () => {
        editValueRemoveDoTask = [];
        pElements.map((pElement, index) => {
          let containDoTask = pElement.classList.contains("doTask");

          if (idx == index) {
            editValueRemoveDoTask.push(false);
          } else {
            editValueRemoveDoTask.push(containDoTask);
          }
        });
        if (
          editButton.addEventListener("click", (event) => {
            pElements.map((element) => {
              element.classList.remove("doTask");
              if (editInput.value != "") {
                localStorage.setItem(
                  "VerifyDoElement",
                  JSON.stringify(editValueRemoveDoTask)
                );

                pElements[idx].classList.add("doTask");
                event.preventDefault();
              }
            });
          })
        ) {
        }
      });
    });
  };

  doTaskOfList();
  saveDoTasks();
  removeTasks();
  reloadDoTasks();
  editValue();
  addEditEventListeners();
};

buttonAddValue.addEventListener("click", () => {
  if (inputAddValue.value != "") {
    responseContainer.innerHTML = "";
    toDoValues.push(inputAddValue.value.trim());
    createDivValue(toDoValues);
    inputAddValue.value = "";
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
    return;
  }
});
