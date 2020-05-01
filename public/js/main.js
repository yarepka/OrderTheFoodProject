let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");
let currentYear = new Date().getFullYear();
let toggler = document.querySelector(".toggler");
let buttons = document.querySelectorAll("a");
let mobileLocationBtn = document.querySelector(".mobile-location");

moreBtn.addEventListener("click", (e) => {
  let moreContent = document.querySelector(".more-content");
  console.log(moreContent);
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
  if (width >= 701) {
    document.querySelector(".toggler").checked = false;
    locationItems = document.querySelectorAll(".location-item");
    locationItems.forEach(item => {
      item.classList.remove("show");
    });
    if (mobileLocationBtn.classList.contains("active")) {
      mobileLocationBtn.classList.toggle("active");
    }
  }
});

mobileLocationBtn.addEventListener("click", () => {
  locationItems = document.querySelectorAll(".location-item");
  locationItems.forEach(item => {
    item.classList.toggle("show");
  });
  mobileLocationBtn.classList.toggle("active");
});

// set current year
document.querySelector(".year").innerHTML = currentYear;
