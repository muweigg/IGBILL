$(() => {
    let phoneValidDialogEl = document.querySelector('.phone-valid-dialog');

    if (phoneValidDialogEl) {
        window.phoneValidDialog = {
            el: phoneValidDialogEl,
            okCB: null,
            closeCB: null,
            init: function () {
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
            },
            open: function (okCB, closeCB) {
                this.el.classList.add('active');
                this.okCB = okCB;
                this.closeCB = closeCB;
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
            close: function () {
                if (typeof this.closeCB === 'function') this.closeCB();
                this.el.classList.remove('active');
            }
        };
        window.phoneValidDialog.init();
    }
});