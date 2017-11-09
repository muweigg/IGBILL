$(() => {
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 6,
        spaceBetween: 20,
        freeMode: true,
        navigation: {
            prevEl: '.swiper-btn-prev',
            nextEl: '.swiper-btn-next',
            disabledClass: 'disabled',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 15,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });
});