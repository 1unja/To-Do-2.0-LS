const form = document.querySelector("#form");
const input = document.querySelector("#input-text");
const list = document.querySelector("#list");

let taskSave = [];

if (localStorage.getItem("value")) {
  taskSave = JSON.parse(localStorage.getItem("value"));
}

localStorage.clear();

form.addEventListener("submit", taskListen);

list.classList.add("window-none");

for (let item of taskSave) {
  const idontknow = item;
  const newContainer = document.createElement("div");
  newContainer.setAttribute("id", item.id);

  let space = true;

  addList();
  done();
  deleteF();
  checkList();

  input.value = "";
  input.focus();

  function addList() {
    const newTask = document.createElement("span");
    idontknow.done
      ? newTask.classList.add("done")
      : newTask.classList.remove("done");
    newTask.innerText = item.text;
    list.append(newContainer);
    newContainer.classList.add("task-line");
    newContainer.append(newTask);
  }

  function done() {
    const doneBtn = document.createElement("button");
    doneBtn.setAttribute("role", "button");
    doneBtn.innerText = "done";
    doneBtn.classList.add("done-btn");
    newContainer.append(doneBtn);
    doneBtn.addEventListener("click", function () {
      this.closest("div").querySelector("span").classList.add("done");
      const doneID = this.closest("div").id;
      const resultDone = taskSave.findIndex(function (element) {
        return element.id == doneID;
      });
      taskSave[resultDone].done = true;
      save();
    });
  }

  function deleteF() {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("role", "button");
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add("delete-btn");
    newContainer.append(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      this.closest("div").remove();
      if (list.querySelector("div")) {
        space = true;
      } else {
        space = false;
      }
      if (space === false) {
        list.classList.add("window-none");
        list.querySelector("h1").classList.remove("close");
        list.querySelector("h1").classList.add("open");
      } else {
        list.classList.remove("window-none");
        list.querySelector("h1").classList.remove("open");
        list.querySelector("h1").classList.add("close");
      }
      j = taskSave.indexOf(item);
      taskSave.splice(j, 1);
      save();
    });
  }

  function checkList() {
    if (space === false) {
      list.classList.add("window-none");
      list.querySelector("h1").classList.remove("close");
      list.querySelector("h1").classList.add("open");
    } else {
      list.classList.remove("window-none");
      list.querySelector("h1").classList.remove("open");
      list.querySelector("h1").classList.add("close");
    }
  }

  function save() {
    localStorage.setItem("value", JSON.stringify(taskSave));
  }
}

function taskListen(event) {
  event.preventDefault();

  const text = input.value;

  const newContainer = document.createElement("div");

  let space = true;

  const idontknow = {
    id: Date.now(),
    text: text,
    done: false,
  };

  taskSave.push(idontknow);

  addList();
  done();
  deleteF();
  checkList();

  input.value = "";
  input.focus();

  function addList() {
    const newTask = document.createElement("span");
    idontknow.done
      ? newTask.classList.add("done")
      : newTask.classList.remove("done");
    newTask.innerText = idontknow.text;
    list.append(newContainer);
    newContainer.classList.add("task-line");
    newContainer.setAttribute("id", idontknow.id);
    newContainer.append(newTask);
  }

  function done() {
    const doneBtn = document.createElement("button");
    doneBtn.setAttribute("role", "button");
    doneBtn.innerText = "done";
    doneBtn.classList.add("done-btn");
    newContainer.append(doneBtn);
    doneBtn.addEventListener("click", function () {
      this.closest("div").querySelector("span").classList.add("done");
      const doneID = this.closest("div").id;
      const resultDone = taskSave.findIndex(function (item) {
        return item.id == doneID;
      });
      taskSave[resultDone].done = true;
      save();
    });
  }

  function deleteF() {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("role", "button");
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add("delete-btn");
    newContainer.append(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      const deleteObject = this.closest("div").id;
      const index = taskSave.findIndex(function (element) {
        if (element.id == deleteObject) {
          return true;
        }
      });
      taskSave.splice(index, 1);
      this.closest("div").remove();
      if (list.querySelector("div")) {
        space = true;
      } else {
        space = false;
      }
      if (space === false) {
        list.classList.add("window-none");
        list.querySelector("h1").classList.remove("close");
        list.querySelector("h1").classList.add("open");
      } else {
        list.classList.remove("window-none");
        list.querySelector("h1").classList.remove("open");
        list.querySelector("h1").classList.add("close");
      }
      save();
    });
  }

  function checkList() {
    if (space === false) {
      list.classList.add("window-none");
      list.querySelector("h1").classList.remove("close");
      list.querySelector("h1").classList.add("open");
    } else {
      list.classList.remove("window-none");
      list.querySelector("h1").classList.remove("open");
      list.querySelector("h1").classList.add("close");
    }
  }

  function save() {
    localStorage.setItem("value", JSON.stringify(taskSave));
  }

  save();
}

localStorage.setItem("value", JSON.stringify(taskSave));
