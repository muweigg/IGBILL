$(() => {
    let phoneValidDialogEl = document.querySelector('.phone-valid-dialog');

    if (phoneValidDialogEl) {
        window.phoneValidDialog = {
            el: phoneValidDialogEl,
            okCB: null,
            cancelCB: null,
            init: function () {
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
            },
            open: function (options = { okCB: null, cancelCB: null }) {
                this.el.classList.add('active');
                this.okCB = options.okCB;
                this.cancelCB = options.cancelCB;
            },
            ok: function () {
                let subject = null, subject$;
                if (typeof this.okCB === 'function') subject = this.okCB();

                if (subject && typeof subject === 'object') {
                    subject$ = subject.subscribe(valid => valid ? this.el.classList.remove('active') : '')
                } else {
                    this.el.classList.remove('active');
                    if (subject$) subject$.unsubscribe();
                }
            },
            cancel: function () {
                if (typeof this.cancelCB === 'function') this.cancelCB();
                this.el.classList.remove('active');
            }
        };
        window.phoneValidDialog.init();
    }
});