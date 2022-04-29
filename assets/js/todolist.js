import LocalStorage from "./LocalStorage.js";

const app = {
  init: function () {
    console.log("app.init()");
    const storage = new LocalStorage();
    const tasks = storage.tasks;
    console.log(tasks);
    // Create a "close" button and append it to each list item
    const myNodelist = document.getElementsByTagName("LI");
    for (const element of myNodelist) {
      app.addCloseBtn(element);
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

  addCloseBtn: function (element) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    element.appendChild(span);
    span.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  },

  // Create a new list item when clicking on the "Add" button
  newElement: function () {
    const li = document.createElement("LI");
    const inputValue = document.getElementById("myInput").value;
    const content = document.createTextNode(inputValue);
    li.appendChild(content);
    if (inputValue === "") {
      alert("Veuillez saisir une tâche");
    } else {
      document.getElementById("myUL").appendChild(li);
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
