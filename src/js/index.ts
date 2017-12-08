(() => {
    if (isIE() > 9 || !isIE()) {
        require('../../node_modules/swiper/dist/css/swiper.css');
        let Swiper = require('babel-loader!swiper/dist/js/swiper');
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            // spaceBetween: 20,
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
                993: {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    // spaceBetween: 10,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                }
            }
        });
    } else {
        require('../css/common/idangerous.swiper/idangerous.swiper.css');
        let Swiper = require('../js/common/third-party/idangerous.swiper/idangerous.swiper.js');
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            autoResize: true,
            calculateHeight: true,
            resizeReInit: true,
        });
        
        $('.swiper-btn-prev').on('click', function(e){
            e.preventDefault()
            mySwiper.swipePrev()
        })
        $('.swiper-btn-next').on('click', function(e){
            e.preventDefault()
            mySwiper.swipeNext()
        })
    }
})()