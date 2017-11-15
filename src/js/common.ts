
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

    window.dialog = {
        el: document.querySelector('.common-dialog'),
        titleEl: null,
        contentEl: null,
        okCB: null,
        cancelCB: null,
        init: function () {
            this.titleEl = $(this.el.querySelector('.dialog-content p:nth-of-type(1)'));
            this.contentEl = $(this.el.querySelector('.dialog-content p:nth-last-of-type(1)'));
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.cancel());
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.cancel());
            Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
            Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-last-of-type(1)'), 'click').subscribe(() => this.cancel());
        },
        open: function (options = { msg: '', title: '信息提示', okCB: null, cancelCB: null }) {
            this.el.classList.add('active');
            this.titleEl.text(options.title);
            this.contentEl.text(options.msg);
            this.okCB = options.okCB;
            this.cancelCB = options.cancelCB;
        },
        ok: function () {
            console.log(typeof this.okCB);
            if (typeof this.okCB === 'function') this.okCB();
            this.el.classList.remove('active');
        },
        cancel: function () {
            if (typeof this.cancelCB === 'function') this.cancelCB();
            this.el.classList.remove('active');
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

        // logout
        let logoutWrap = document.querySelector('.user .user-name a');

        if (logoutWrap) {
            let logoutWrapDoc$ = Rx.Observable.fromEvent(document, 'click').skip(1), logoutWrapDoc$$;
            
            let toggleLogoutPopupState = () => {
                logoutWrap.classList.toggle('open');
                if (logoutWrap.classList.contains('open')) logoutWrapDoc$$ = logoutWrapDoc$.subscribe(toggleLogoutPopupState);
                else if (logoutWrapDoc$$) logoutWrapDoc$$.unsubscribe();
            }
            
            Rx.Observable.fromEvent(logoutWrap, 'click')
                .subscribe(toggleLogoutPopupState);
        }

    }

});