let navBtn = document.getElementsByClassName('navbar__menuIcon')[0];
navBtn.addEventListener("click", event => {
    let dropMenu = document.getElementsByClassName('menu')[0];
    let btn = event.target;
    btn.classList.toggle('navbar__menuIcon--active');
    dropMenu.classList.toggle('menu--active');
});

let menu = document.getElementsByClassName('menu')[0];
menu.addEventListener('click', event => {
    let items = document.getElementsByClassName('menu__link');
    for (let item of items) {
        item.classList.remove('menu__link--active');
    }
    event.target.classList.add('menu__link--active');
});

$(document).ready(function () {
  $('.slider__slick').slick({
    arrows: true,
    prevArrow: $('.slider__prev'),
    nextArrow: $('.slider__next')
  });
});