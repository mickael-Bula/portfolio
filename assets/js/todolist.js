import LocalStorage from "./LocalStorage.js";

const app = {
  storage: new LocalStorage(),

  init: function () {
    console.log("app.init()");
    for (const task of app.storage.getTasks()) {
      app.displayListElement(task);
    }

    document.querySelector(".addBtn").addEventListener("click", app.newElement);
    document
      .getElementById("form")
      .addEventListener("submit", app.handleSubmit);

    // Add a "checked" symbol when clicking on a list item
    const list = document.querySelector("ul");
    list.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
        }
      },
      false
    );
  },

  displayListElement: function (task) {
    const li = document.createElement("LI");
    li.className = "task";
    const content = document.createTextNode(task.content);
    li.appendChild(content);
    li.id = task.id;
    document.getElementById("myUL").appendChild(li);
    // Create a "close" button and append it to each list item
    app.addCloseBtn(li);
  },

  addCloseBtn: function (element) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    element.appendChild(span);
    span.addEventListener("click", function () {
      this.parentElement.style.display = "none";
      app.storage.delete(this.parentElement.id);
    });
  },

  // Create a new list item when clicking on the "Add" button
  newElement: function () {
    const li = document.createElement("LI");
    li.className = "task";
    const inputValue = document.getElementById("myInput").value;
    const content = document.createTextNode(inputValue);
    li.appendChild(content);
    if (inputValue === "") {
      alert("Veuillez saisir une tâche");
    } else {
      document.getElementById("myUL").appendChild(li);
      const task = { content: inputValue };
      // get id returned by storage.create and add it to DOM
      li.id = app.storage.create(task);
    }
    document.getElementById("myInput").value = "";
    app.addCloseBtn(li);
  },

  // add a new task when ENTER is pressed
  handleSubmit: function (event) {
    event.preventDefault();
    app.newElement();
  },
};

document.addEventListener("DOMContentLoaded", app.init);

// TODO : ajouter une propriété isChecked pour gérer l'état de chaque tâche
