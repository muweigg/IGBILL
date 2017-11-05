$(() => {
    let loginIGB = $('.login-igb button');
    let confirmPay = $('.confirm-pay button');
    let searchBar = $('.search-bar i');
    let sort = $('.skins .all-and-sort .sort');

    loginIGB.click(function () {
        $('.login-igb').hide();
        $('.confirm-pay').show();
    });

    confirmPay.click(function () {
        $('.confirm-pay').hide();
    });

    searchBar.click(function () {
        $('.search-bar').toggleClass('open');
    });

    sort.click(function () {
        $(this).toggleClass('reverse');
    });
});