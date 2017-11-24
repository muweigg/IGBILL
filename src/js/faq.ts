$(() => {
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