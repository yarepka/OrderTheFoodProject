let moreBtn = document.querySelector(".more-btn");
let moreIcon = document.querySelector(".more-btn a i");
let currentYear = new Date().getFullYear();
let toggler = document.querySelector(".toggler");
let buttons = document.querySelectorAll("a");
let btnSoldOut = document.querySelector("#product-info-item .product-info-price .btn-sold-out");

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

window.addEventListener("resize", (e) => {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width >= 701) {
    let toggler = document.querySelector(".toggler");
    if (toggler.checked === true) {
      toggler.checked = false;
      locationItems = document.querySelectorAll(".location-item");
      locationItems.forEach(item => {
        item.classList.remove("show");
      });
      if (mobileLocationBtn.classList.contains("active")) {
        mobileLocationBtn.classList.toggle("active");
      }
    }
  }
});

if (btnSoldOut) {
  btnSoldOut.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

if (moreBtn) {
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
}

// set current year
const year = document.querySelector(".year");
if (year) {
  year.innerHTML = currentYear;
}
