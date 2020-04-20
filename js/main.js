let locationBtn = document.querySelector(".location");
let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");

locationBtn.addEventListener("click", () => {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

moreBtn.addEventListener("click", () => {
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
