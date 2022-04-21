console.log("app.init()");
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.hamburger');
const navItems = nav.querySelectorAll('.nav__link');

toggle.addEventListener('click', toggleNav);

function toggleNav() {
    console.log("dans togglenav");
  
  // Show Nav
  nav.classList.toggle('active');
  
  // Transform Hamburger into 'X'
  toggle.classList.toggle('active');
  
  // Show Nav Items
  navItems.forEach(item => item.classList.toggle('active'));
}
