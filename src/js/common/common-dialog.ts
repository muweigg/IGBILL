$(() => {
    let commonDialogEl = document.querySelector('.common-dialog');

    if (commonDialogEl) {
        window.dialog = {
            el: document.querySelector('.common-dialog'),
            titleEl: null,
            contentEl: null,
            okCB: null,
            cancelCB: null,
            init: function () {
                this.titleEl = $(this.el.querySelector('.dialog-content p:nth-of-type(1)'));
                this.contentEl = $(this.el.querySelector('.dialog-content p:nth-last-of-type(1)'));
                // Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.cancel());
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
                if (typeof this.okCB === 'function') this.okCB();
                this.el.classList.remove('active');
            },
            cancel: function () {
                if (typeof this.cancelCB === 'function') this.cancelCB();
                this.el.classList.remove('active');
            }
        };
        window.dialog.init();
    }
});