const reveal = {
    init: function() {
        console.log("reveal.init()");

        window.addEventListener("scroll", reveal.reveal);

        const toggle = document.querySelector(".hamburger");
        
        toggle.addEventListener("click", reveal.toggleNav);
    },
    
    toggleNav: function() {
        const nav = document.querySelector(".nav");
        const navItems = nav.querySelectorAll(".nav__link");
        // on affiche la navbar
        nav.classList.toggle("active");

        // on transforme le menu hamburger en 'X'
        toggle.classList.toggle("active");

        // on affiche les liens de la navbar
        navItems.forEach((item) => item.classList.toggle("active"));
    },

    reveal: function() {
        // on récupère l'ensemble des éléments ayant la classe .reveal
        const reveals = document.querySelectorAll(".reveal");

        // on récupère la taille de l'écran et on fixe une hauteur pour l'apparition des  éléments
        const windowHeight = window.innerHeight;
        const elementVisible = 50;

        // on boucle sur les éléments pour vérifier si la hauteur a été atteinte pour ajouter la classe .show ou la supprimer
        for (const reveal of reveals) {
            reveal.getBoundingClientRect().top < windowHeight - elementVisible
            ? reveal.classList.add("show")
            : reveal.classList.remove("show");
        }
    }
}

export default reveal;
