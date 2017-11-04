$(() => {
    let loginIGB = $('.login-igb button');
    let confirmPay = $('.confirm-pay button');
    let searchBar = $('.search-bar i');

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
});