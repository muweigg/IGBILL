import 'script-loader!babel-loader!./third-party/Rx';
import 'script-loader!babel-loader!lodash/lodash';
import 'script-loader!babel-loader!vue/dist/vue.min';
import 'script-loader!babel-loader!axios/dist/axios';
import 'script-loader!babel-loader!jquery/dist/jquery';
import 'script-loader!babel-loader!classList.js';

import 'script-loader!babel-loader!./third-party/fastclick';
import 'script-loader!babel-loader!./third-party/flexible';
import 'script-loader!babel-loader!./third-party/pickadate.js/picker';
import 'script-loader!babel-loader!./third-party/pickadate.js/picker.date';
import 'script-loader!babel-loader!./third-party/pickadate.js/picker.time';

import 'script-loader!babel-loader!vee-validate/dist/vee-validate';

import 'core-js/es6/promise';

Vue.use(VeeValidate);

window.isMobile = false;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.isMobile = true;
}

window.isIE = () => {
    var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return match ? parseInt(match[1]) : undefined;
}

const fixedHeader = top => {
    let header = document.querySelector('.main-header');
    if (!header) return;
    if (top > 0 && header.classList.contains('fixed')) return;
    if (top > 0 && !header.classList.contains('fixed')) header.classList.add('fixed');
    else header.classList.remove('fixed');
}

$(() => {

    // 头部固定
    let fixed = Rx.Observable.fromEvent(document, 'scroll')
        // .debounceTime(20)
        .map(e => isIE() ? document.documentElement.scrollTop : window.scrollY).subscribe(fixedHeader);

    fixedHeader(isIE() ? document.documentElement.scrollTop : window.scrollY);
    
    // 主菜单
    let mainMenuElem = document.querySelector('.main-header nav');
    let mainMenuBtn = document.querySelector('.main-header .main-menu'), mainMenuBtn$;
    let mainMenuDoc$ = Rx.Observable.fromEvent(document, 'click').skip(1), mainMenuDoc$$;

    if (mainMenuBtn) {
        let toggleMainMenuState = () => {
            mainMenuBtn.classList.toggle('open');
            $(mainMenuElem).slideToggle('fast');
            if (mainMenuBtn.classList.contains('open')) mainMenuDoc$$ = mainMenuDoc$.subscribe(toggleMainMenuState);
            else if (mainMenuDoc$$) mainMenuDoc$$.unsubscribe();
        }
        
        mainMenuBtn$ = Rx.Observable.fromEvent(mainMenuBtn, 'click')
            .subscribe(toggleMainMenuState);
    }

    // 移动端
    if (window.isMobile) {
        FastClick.attach(document.body);

        // 用户余额弹出菜单
        let userElem = document.querySelector('.main-header .user');
        let userDoc$ = Rx.Observable.fromEvent(document, 'click').skip(1), userDoc$$;

        if (userElem) {
            let toggleUserPopupState = () => {
                let wrap = userElem.querySelector('.user-wrap');
                wrap.classList.toggle('open');
                // $(wrap).fadeToggle('fast');
                if (wrap.classList.contains('open')) userDoc$$ = userDoc$.subscribe(toggleUserPopupState);
                else if (userDoc$$) userDoc$$.unsubscribe();
            }
                
            Rx.Observable.fromEvent(userElem, 'click')
                .subscribe(toggleUserPopupState);
        }
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

import 'script-loader!babel-loader!./common-dialog.ts';
import 'script-loader!babel-loader!./notice.ts';
import 'script-loader!babel-loader!./terms-dialog.ts';
import 'script-loader!babel-loader!./phone-valid-dialog.ts';
import 'script-loader!babel-loader!./toast.ts';
import 'script-loader!babel-loader!./tips.ts';
