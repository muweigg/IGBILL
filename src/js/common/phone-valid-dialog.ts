$(() => {
    let phoneValidDialogEl = document.querySelector('.phone-valid-dialog');

    if (phoneValidDialogEl) {
        window.phoneValidDialog = {
            el: phoneValidDialogEl,
            okCB: null,
            cancelCB: null,
            init: function () {
                // Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-last-of-type(1)'), 'click').subscribe(() => this.cancel());
            },
            open: function (options = { okCB: null, cancelCB: null }) {
                this.el.classList.add('active');
                this.okCB = options.okCB;
                this.cancelCB = options.cancelCB;
            },
            ok: function () {
                if (typeof this.okCB === 'function') this.okCB();
                this.el.classList.remove('active');
            },
            cancel: function () {
                if (typeof this.cancelCB === 'function') this.cancelCB();
                this.el.classList.remove('active');
            }
        };
        window.phoneValidDialog.init();
    }
});