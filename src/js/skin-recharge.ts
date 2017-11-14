$(() => {
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');
    let pay = $('.chose-skins header button');

    searchBar.click(function () {
        $('.search-bar').toggleClass('open');
    });

    sort.click(function () {
        $(this).toggleClass('reverse');
    });
    
    pay.click(function () {
        $(this).addClass('disabled').find('span').text('等待中...');
        setTimeout(() => {
            $('.waiting').show();
            setTimeout(() => loadErrorDialog.open(() => alert('callback...')), 1000);
        }, 1000);
    });
    
    // 对话框
    let loadErrorDialog = {
        el: document.querySelector('.load-steam-error'),
        cb: null,
        init: function () {
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-overlay'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
            Rx.Observable.fromEvent(this.el.querySelector('.buttons button'), 'click').subscribe(() => this.close());
        },
        open: function (cb) {
            this.el.classList.add('active');
            this.cb = cb;
        },
        close: function () {
            this.el.classList.remove('active');
            if (typeof this.cb === 'function') this.cb();
        }
    };
    loadErrorDialog.init();

});