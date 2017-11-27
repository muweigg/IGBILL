$(() => {
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');
    let pay = $('.chose-skins header button');
    let refresh = $('.skins .all-and-sort .refresh');

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

    refresh.click(function () {
        $(this).toggleClass('refreshing');
    });

    let tradeUrlWrapEl = document.querySelector('.chose-skins header .row:nth-last-of-type(1) > div > span');
    let tradeUrlSaveEl = tradeUrlWrapEl.querySelector('a');
    let tradeInput$ = Rx.Observable.fromEvent(tradeUrlWrapEl.querySelector('input'), 'input');
    tradeInput$.map(e => e.target.value).subscribe(value => {
        if (_.trim(value) === '')
            $(tradeUrlWrapEl).removeClass('input').removeClass('success').addClass('no-input');
        else
            $(tradeUrlWrapEl).removeClass('no-input').addClass('input');
    })
    $(tradeUrlSaveEl).click(() => {
        $(tradeUrlWrapEl).removeClass('input').addClass('success');
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