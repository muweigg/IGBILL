$(() => {
    let loginIGB = $('.login-igb button');
    let confirmPay = $('.confirm-pay button');
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');
    let pay = $('.balance button');

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

    sort.click(function () {
        $(this).toggleClass('reverse');
    });
});