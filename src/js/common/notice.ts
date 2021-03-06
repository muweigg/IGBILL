$(() => {
    let notice = document.querySelector('.notice');

    if (notice) {
        window.notice = {
            el: notice,
            divEl: null,
            txtEl: null,
            resize$$: null,
            init: function () {
                this.divEl = this.el.querySelector('div');
                this.txtEl = this.divEl.querySelector('span');
                Rx.Observable.fromEvent(this.el.querySelector('.icon-notice-close'), 'click').subscribe(() => this.close());
            },
            calcDuration: function () {
                let sW:any = this.txtEl.getClientRects()[0].width;
                /* $(this.txtEl).css({
                    '-o-animation-duration': (sW * 20) + 'ms',
                    '-moz-animation-duration': (sW * 20) + 'ms',
                    '-webkit-animation-duration': (sW * 20) + 'ms',
                    'animation-duration': (sW * 20) + 'ms',
                }); */
                $(this.txtEl).removeAttr('style').attr('style', 
                    `
                        -o-animation: scroll ${(sW * 20)}ms linear infinite;
                        -moz-animation: scroll ${(sW * 20)}ms linear infinite;
                        -webkit-animation: scroll ${(sW * 20)}ms linear infinite;
                        animation: scroll ${(sW * 20)}ms linear infinite;
                    `
                );
            },
            open: function (msg: '') {
                $(this.txtEl).html(msg).addClass('animation');
                $('body').addClass('notice-open')
                $(this.el).fadeIn(300);
                this.calcDuration();
                this.resize$$ = Rx.Observable.fromEvent(window, 'resize')
                    .debounceTime(50)
                    .subscribe(() => this.calcDuration());
            },
            close: function () {
                $('body').removeClass('notice-open');
                $(this.el).fadeOut(300);
                this.resize$$.unsubscribe();
            }
        }
        window.notice.init();
    }
});