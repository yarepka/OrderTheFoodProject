let locationBtn = document.querySelector(".location");
let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");
let currentYear = new Date().getFullYear();
let showButton = document.querySelector(".show-btn a");
let toggler = document.querySelector(".toggler");

locationBtn.addEventListener("click", () => {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

moreBtn.addEventListener("click", (e) => {
  let moreContent = document.querySelector(".more-content");
  moreContent.classList.toggle("show");
  e.preventDefault();
  if (moreContent.classList.contains("show")) {
    moreIcon.classList.remove("fa-angle-down");
    moreIcon.classList.add("fa-angle-up");
  } else {
    moreIcon.classList.remove("fa-angle-up");
    moreIcon.classList.add("fa-angle-down");
  }
});

window.addEventListener("resize", (e) => {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width >= 1061) {
    let button = (document.querySelector(".toggler").checked = false);
  }
});
// don't move camera when click the button
showButton.addEventListener("click", (e) => {
  e.preventDefault();
});

// set current year
document.querySelector(".year").innerHTML = currentYear;
