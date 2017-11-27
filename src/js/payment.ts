$(() => {
    let loginIGB = $('.login-igb a');
    let confirmPay = $('.confirm-pay button');
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');
    let pay = $('.balance button');
    let refresh = $('.skins .all-and-sort .refresh');

    loginIGB.click(function () {
        $('.login-igb').hide();
        $('.confirm-pay').show();
    });

    confirmPay.click(function () {
        $('.confirm-pay').hide();
        $('.chose-skins').show();
    });

    searchBar.click(function () {
        $('.search-bar').toggleClass('open');
    });

    pay.click(function () {
        $(this).addClass('disabled').find('span').text('等待中...');
        setTimeout(() => {
            $('.waiting').show();

            setTimeout(() => {
                $('.container-wrap').eq(0).hide();
                $('.pay-results').show();
            }, 1000);
        }, 1000);
    });
    
    refresh.click(function () {
        $(this).toggleClass('refreshing');
    });

    sort.click(function () {
        $(this).toggleClass('reverse');
    });
    
    let tradeUrlWrapEl = document.querySelector('.trade-url > span:nth-last-of-type(1)');
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
});