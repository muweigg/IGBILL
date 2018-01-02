$(() => {
    const params = window.location.href.extract();
    let tabs = $('.tabs a'), tabContents = $('.tab-content');
    tabs.click(function () {
        let idx = $(this).index();
        tabs.removeClass('active');
        $(this).addClass('active');
        tabContents.hide();
        tabContents.eq(idx).show();
    });
    params && params.active ? tabs.eq(params.active).click() : tabs.eq(0).click();

    let sections = $('section');
    sections.map(function(i, section){
        if ($(section).hasClass('active'))
            $(section).find('> div').slideDown(300);
    });
    sections.find('header').click(function () {
        let section = $(this).parent('section');
        section.toggleClass('active');

        if (section.hasClass('active')) {
            $(this).next().slideDown(300);
        } else {
            $(this).next().slideUp(300);
        }
    });
});