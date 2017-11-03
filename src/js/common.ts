window.isMobile = false;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.isMobile = true;
}

$(() => {

    let fixed = Rx.Observable.fromEvent(document, 'scroll')
        // .debounceTime(20)
        .map(e => window.scrollY).subscribe(top => {
            let header = document.querySelector('.main-header');
            if (top > 0 && header.classList.contains('fixed')) return;
            if (top > 0 && !header.classList.contains('fixed')) header.classList.add('fixed');
            else header.classList.remove('fixed');
        });
        
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

    // 移动端
    if (window.isMobile) {
        FastClick.attach(document.body);

        // 用户余额弹出菜单
        let userElem = document.querySelector('.main-header .user');
        let userDoc$ = Rx.Observable.fromEvent(document, 'click').skip(1), userDoc$$;

        let toggleUserPopupState = () => {
            let wrap = userElem.querySelector('.user-wrap');
            wrap.classList.toggle('open');
            // $(wrap).fadeToggle('fast');
            if (wrap.classList.contains('open')) userDoc$$ = userDoc$.subscribe(toggleUserPopupState);
            else if (userDoc$$) userDoc$$.unsubscribe();
        }
            
        Rx.Observable.fromEvent(userElem, 'click')
            .subscribe(toggleUserPopupState);

        // 主菜单
        let mainMenuElem = document.querySelector('.main-header nav');
        let mainMenuBtn = document.querySelector('.main-header .main-menu'), mainMenuBtn$;
        let mainMenuDoc$ = Rx.Observable.fromEvent(document, 'click').skip(1), mainMenuDoc$$;

        let toggleMainMenuState = () => {
            mainMenuBtn.classList.toggle('open');
            $(mainMenuElem).slideToggle('fast');
            if (mainMenuBtn.classList.contains('open')) mainMenuDoc$$ = mainMenuDoc$.subscribe(toggleMainMenuState);
            else if (mainMenuDoc$$) mainMenuDoc$$.unsubscribe();
        }
        
        mainMenuBtn$ = Rx.Observable.fromEvent(mainMenuBtn, 'click')
            .subscribe(toggleMainMenuState);
    } else {
        // PC 端
        

    }

});