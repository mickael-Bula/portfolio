import slide from "./slide.js";

const labs = {
  init: function () {
    console.log("labs.init()");
    slide.init();
    labs.run();
  },

  // suppression de tous les éléments de la classe .slide
  removeElement: function () {
    Array.from(document.getElementsByClassName("slide")).forEach((el) =>
      el.remove()
    );
  },

  // création d'un composant div
  createElement: function (tag, parent, attributes, i) {
    const element = document.createElement(tag);
    for (const attribute in attributes) {
      // on ajoute à l'élément toutes les propriétés de l'objet attributes passé en paramètre
      element[attribute] = attributes[attribute];
      element.textContent = "elément " + i;
    }
    parent.appendChild(element);
    return element;
  },

  run: function () {
    window.setInterval(() => {
      labs.removeElement();
      labs.showDIvs();
    }, 5000);
  },

  showDIvs: function () {
    // le parent est soit div.root, soit son dernier enfant
    const parent =
      document.getElementById("root").lastElementChild !== null
        ? document.getElementById("root").lastElementChild
        : document.getElementById("root");

    for (let i = 1; i < 6; i++) {
      // les boîtes labsaraissent successivement, semblant tomber les unes après les autres
      window.setTimeout(() => {
        labs.createElement("div", parent, { className: "slide" }, i);
      }, 300 * i);
    }
  },
};

document.addEventListener("DOMContentLoaded", labs.init);
