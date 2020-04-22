let locationBtn = document.querySelector(".location");
let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");
let currentYear = new Date().getFullYear();
let toggler = document.querySelector(".toggler");
let buttons = document.querySelectorAll("a");
let mobileLocationBtn = document.querySelector(".mobile-location");

locationBtn.addEventListener("click", () => {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

moreBtn.addEventListener("click", (e) => {
  let moreContent = document.querySelector(".more-content");
  moreContent.classList.toggle("show");
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

mobileLocationBtn.addEventListener("click", () => {
  let dropDownMobile = document.querySelector(".dropdown-content.mobile");
  dropDownMobile.classList.toggle("show");
  mobileLocationBtn.classList.toggle("active");
});

// set current year
document.querySelector(".year").innerHTML = currentYear;
