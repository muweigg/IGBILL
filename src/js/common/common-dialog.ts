$(() => {
    let commonDialogEl = document.querySelector('.common-dialog');

    if (commonDialogEl) {
        window.dialog = {
            el: document.querySelector('.common-dialog'),
            box: null,
            titleEl: null,
            contentEl: null,
            okCB: null,
            cancelCB: null,
            default: { msg: '', title: '信息提示', okCB: null, cancelCB: null },
            init: function () {
                this.box = this.el.querySelector('.dialog-box');
                this.titleEl = $(this.el.querySelector('.dialog-content p:nth-of-type(1)'));
                this.contentEl = $(this.el.querySelector('.dialog-content p:nth-last-of-type(1)'));
                // Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-of-type(1)'), 'click').subscribe(() => this.ok());
                Rx.Observable.fromEvent(this.el.querySelector('.buttons button:nth-last-of-type(1)'), 'click').subscribe(() => this.cancel());
                Rx.Observable.fromEvent(this.el, 'animationend').subscribe(() => this.HDText());
            },
            open: function (options = {}) {
                let opt = Object.assign({}, this.default, options);
                this.el.classList.add('active');
                this.titleEl.text(opt.title);
                this.contentEl.text(opt.msg);
                this.okCB = opt.okCB;
                this.cancelCB = opt.cancelCB;
            },
            ok: function () {
                if (typeof this.okCB === 'function') this.okCB();
                this.el.classList.remove('active');
                this.clearInlineStyle();
            },
            cancel: function () {
                if (typeof this.cancelCB === 'function') this.cancelCB();
                this.el.classList.remove('active');
                this.clearInlineStyle();
            },
            clearInlineStyle: function () {
                this.box.removeAttribute("style");
            },
            HDText: function () {
                if (window.isMobile) return;
                if (this.el.classList.contains('active')) {
                    let { width, height } = this.box.getBoundingClientRect();
                    width = parseInt(width);
                    height = parseInt(height);
                    if (width % 2 === 1) width = width + 1;
                    if (height % 2 === 1) height = height + 1;
                    this.box.style.minWidth = `${width}px`;
                    this.box.style.minHeight = `${height}px`;
                }
            }
        };
        window.dialog.init();
    }
});