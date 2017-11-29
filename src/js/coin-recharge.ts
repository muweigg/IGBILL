$(() => {
    let group = $('.quantity .group');
    let input = group.find('input');
    let span = group.find('span');
    span.click(function () {
        let method = $(this).data('method');
        let val = parseInt(input.val());
        if (method === 'increment') {
            input.val(++val);
        } else {
            input.val(--val < 1 ? 1 : val);
        }
    });
});