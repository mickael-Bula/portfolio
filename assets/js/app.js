console.log("app.init()");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".hamburger");
const navItems = nav.querySelectorAll(".nav__link");

toggle.addEventListener("click", toggleNav);

function toggleNav() {
  console.log("dans togglenav");

  // Show Nav
  nav.classList.toggle("active");

  // Transform Hamburger into 'X'
  toggle.classList.toggle("active");

  // Show Nav Items
  navItems.forEach((item) => item.classList.toggle("active"));
}

function reveal() {
  // on récupère l'ensemble des éléments ayant la classe .reveal
  const reveals = document.querySelectorAll(".reveal");

  // on récupère la taille de l'écran et on fixe une hauteur pour l'apparition des  éléments
  const windowHeight = window.innerHeight;
  let elementVisible = 100;

  // on boucle sur les éléments pour vérifier si la hauteur a été atteinte pour ajouter la classe .show ou l'enlever
  for (const reveal of reveals) {
    if (reveal.getBoundingClientRect().top < windowHeight - elementVisible)
      reveal.classList.add("show");
    else reveal.classList.remove("show");
    // on incrémente la hauteur afin de créer un décallage dans l'apparition des éléments
    elementVisible += 50;
  }
}

window.addEventListener("scroll", reveal);
