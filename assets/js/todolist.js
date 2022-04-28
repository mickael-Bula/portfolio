// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
for (const element of myNodelist) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  element.appendChild(span);
}

document.querySelector(".addBtn").addEventListener("click", newElement);
document.getElementById("form").addEventListener("submit", handleSubmit);

// Click on a close button to hide the current list item
const close = document.getElementsByClassName("close");
for (let item of close) {
  item.addEventListener("click", function () {
    this.parentElement.style.display = "none";
  });
}

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

// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement("li");
  const inputValue = document.getElementById("myInput").value;
  const content = document.createTextNode(inputValue);
  li.appendChild(content);
  if (inputValue === "") {
    alert("Veuillez saisir une tâche");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (let item of close) {
    item.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  }
}

// add a new task when ENTER is pressed
function handleSubmit(event) {
  event.preventDefault();
  newElement();
}
