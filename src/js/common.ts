
window.isMobile = false;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.isMobile = true;
}

$(() => {

    // 头部固定
    let fixed = Rx.Observable.fromEvent(document, 'scroll')
        // .debounceTime(20)
        .map(e => window.scrollY).subscribe(top => {
            let header = document.querySelector('.main-header');
            if (top > 0 && header.classList.contains('fixed')) return;
            if (top > 0 && !header.classList.contains('fixed')) header.classList.add('fixed');
            else header.classList.remove('fixed');
        });

    // 对话框
    window.dialog = {
        el: document.querySelector('.load-steam-error'),
        cb: null,
        init: function () {
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.buttons button'), 'click').subscribe(() => this.close());
        },
        open: function (cb) {
            this.el.classList.add('active');
            this.cb = cb;
        },
        close: function () {
            this.el.classList.remove('active');
            if (typeof this.cb === 'function') this.cb();
        }
    };
    window.dialog.init();

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