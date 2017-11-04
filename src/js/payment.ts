$(() => {
    let loginIGB = $('.login-igb button');
    let confirmPay = $('.confirm-pay button');

    loginIGB.click(function () {
        $('.login-igb').hide();
        $('.confirm-pay').show();
    });

    confirmPay.click(function () {
        $('.confirm-pay').hide();
    });
});