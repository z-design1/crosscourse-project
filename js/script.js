const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}
toggle.addEventListener("click", toggleMenu, false);
function ToggleActive(e) {
  if (document.querySelector("#navList a.active") !== null) {
    document.querySelector("#navList a.active").classList.remove("active");
  }
  e.target.className = "active";
}

