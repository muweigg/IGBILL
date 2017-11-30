$(() => {
    let termsDialog = document.querySelector('.terms-dialog');

    if (termsDialog) {
        window.termsDialog = {
            el: termsDialog,
            okCB: null,
            init: function () {
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.close());
            },
            open: function () {
                this.el.classList.add('active');
            },
            close: function () {
                this.el.classList.remove('active');
            },
        };
        window.termsDialog.init();
    }
});