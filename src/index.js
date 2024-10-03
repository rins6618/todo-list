import './styles.css'
import './navbar.css'
import 'iconify-icon'
import './todo'

console.log("Hello, world!");

const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector("#sidebar .toggle-btn");
const projectBtn = document.querySelector("#project-selector");
const projectDropdown = document.querySelector("#project-dropdown");


closeBtn.addEventListener("click", e => {
    sidebar.classList.toggle("close");
})

projectBtn.addEventListener("click", e => {
    console.log("Click");
    projectDropdown.classList.toggle("show");
});

window.addEventListener('click', e => {
    if (!e.target.matches('#project-selector')) {
      let dropdowns = document.querySelectorAll(".dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }); 