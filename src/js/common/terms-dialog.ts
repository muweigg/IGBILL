$(() => {
    let termsDialog = document.querySelector('.terms-dialog');

    if (termsDialog) {
        window.termsDialog = {
            el: termsDialog,
            okCB: null,
            closeCB: null,
            init: function () {
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-last-of-type(1)'), 'click').subscribe(() => this.close());
            },
            open: function (okCB, closeCB) {
                this.el.classList.add('active');
                this.okCB = okCB;
                this.closeCB = closeCB;
            },
            ok: function () {
                if (typeof this.okCB === 'function') this.okCB();
                this.el.classList.remove('active');
            },
            close: function () {
                if (typeof this.closeCB === 'function') this.closeCB();
                this.el.classList.remove('active');
            }
        };
        window.termsDialog.init();
    }
});