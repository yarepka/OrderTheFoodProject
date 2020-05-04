let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");
let currentYear = new Date().getFullYear();
let toggler = document.querySelector(".toggler");
let buttons = document.querySelectorAll("a");

// window.addEventListener('scroll', function () {
//   //When scroll change, you save it on localStorage.
//   localStorage.setItem('scrollPosition', window.scrollY);
// }, false);

// window.addEventListener('load', function () {
//   if (localStorage.getItem('scrollPosition') !== null)
//     window.scrollTo(0, localStorage.getItem('scrollPosition'));
// }, false);

$(window).scroll(function () {
  sessionStorage.scrollTop = $(this).scrollTop();
});

$(window).ready(function () {
  if (sessionStorage.scrollTop != "undefined") {
    $(window).scrollTop(sessionStorage.scrollTop);
  }
});

$('.add-product-container form #button').click(function () {
  $(".add-product-container form input[type='file']").trigger('click');
})

$(".add-product-container form input[type='file']").change(function () {
  $('.add-product-container form #val').text(this.value.replace(/C:\\fakepath\\/i, ''))
})

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

// set current year
document.querySelector(".year").innerHTML = currentYear;
