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
        setTimeout(() => $('.waiting').show(), 1000);
    });

    setTimeout(() => window.dialog.open(() => alert('callback...')), 2000);
});