const cards = {
    init: function () {
      console.log("cards.init()");
  
      document
        .getElementById("card")
        .addEventListener("click", cards.handleClick);
  
      document
        .getElementById("myBtn")
        .addEventListener("click", cards.handleButton);
    },
  
    handleClick: function (event) {
      const card = event.currentTarget;
      const link = document.querySelector(".card__link");
      const icon = document.querySelector(".card__icon");
  
      if (card.classList.contains("open")) {
        card.classList.remove("open");
        link.textContent = "En voir plus ";
        icon.textContent = "↗";
        return;
      }
      card.classList.add("open");
      link.textContent = "En voir moins ";
      icon.textContent = "↙";
    },
  
    handleButton: function () {
      const card = document.getElementById("card__block");
      const button = document.getElementById("myBtn");
  
      if (card.classList.contains("open")) {
        card.classList.remove("open");
        button.textContent = "Lire plus";
        return;
      }
      card.classList.add("open");
      button.textContent = "Lire moins";
    },
  };
  
  export default cards;
  