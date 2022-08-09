const slide = {
  init: function () {
    console.log("slide.init()");

    // ajout de capteur sur les points du slider
    Array.from(document.getElementsByClassName("dot")).forEach((dot) =>
      dot.addEventListener("click", slide.currentSlide)
    );

    // ajout de capteurs sur les chevrons du slider
    document.querySelector(".prev").addEventListener("click", slide.prevSlides);
    document.querySelector(".next").addEventListener("click", slide.nextSlides);

    // affichage du premier slide
    slide.showSlides(slide.slideIndex);
  },

  slideIndex: 1,

  slides: document.getElementsByClassName("mySlides"),

  dots: document.getElementsByClassName("dot"),

  // appel de la méthode affichant le slide précédant
  prevSlides: function () {
    slide.showSlides((slide.slideIndex -= 1));
  },

  // appel de la méthode affichant le slide suivant
  nextSlides: function () {
    slide.showSlides((slide.slideIndex += 1));
  },

  currentSlide: function (event) {
    // récupération de l'indice du .dot courant
    const currentIndex = Array.from(slide.dots).indexOf(event.currentTarget);
    // appel de la méthode pour afficher le slide en transmettant en paramètre le currentIndex mis à jour
    slide.showSlides((slide.slideIndex = currentIndex + 1));
  },

  showSlides: function (n) {
    const len = slide.slides.length;

    // si on arrive à la fin du slider, on recommence au début
    if (n > len) {
      slide.slideIndex = 1;
    }

    // si le slide avant le premier indice est demandé, on sert sur le dernier
    if (n < 1) {
      slide.slideIndex = len;
    }

    // on cache tous les slides
    Array.from(slide.slides).forEach((slide) => {
      slide.style.display = "none";
    });

    // on supprime la classe .active des dots
    Array.from(slide.dots).forEach(
      (dot) => (dot.className = dot.className.replace(" active", ""))
    );

    // puis on affiche le slide courant et on ajoute la classe .active au dot en cours
    slide.slides[slide.slideIndex - 1].style.display = "block";

    slide.dots[slide.slideIndex - 1].className += " active";

    // appel de la méthode déterminant la couleur de fond
    slide.setBackgroundColor(slide.slideIndex - 1);
  },

  // changement de la couleur de fond en fonction du spinner
  setBackgroundColor: function (index) {
    // déclaration d'un tableau des couleurs de fond
    const colors = [
      "orange",
      "light-green",
      "blue",
      "yellow",
      "grey",
      "green",
      "dark-blue",
    ];

    // assignation de la couleur de fond à l'élément .slideshow-container à partir de l'indice fourni en paramètre
    document.querySelector(
      ".slideshow-container"
    ).classList = `slideshow-container slideshow-container--${colors[index]}`;
  },
};

document.addEventListener("DOMContentLoaded", slide.init);
