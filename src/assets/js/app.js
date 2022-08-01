document.addEventListener("DOMContentLoaded", () => {


//= components/




const swiper = new Swiper(".topSales__catalog", {
    slidesPerView: 5,
    spaceBetween: 22,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
        nextEl: ".topSales__nextButton",
        prevEl: ".topSales__prevButton",
    },
});


})











