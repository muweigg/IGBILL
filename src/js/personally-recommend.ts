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
    
    let $dataFrom = $('.date-from');
    let $dataTo = $('.date-to');

    let zh_CN = {
        monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weekdaysFull: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
        showMonthsShort: true,
        format: 'yyyy/mm/dd',
        formatSubmit: 'yyyy/mm/dd',
        today: '今天',
        clear: '清除',
        close: '关闭',
    }

    $dataFrom.pickadate(zh_CN);
    $dataTo.pickadate(zh_CN);

    let copyLink = new Clipboard('#copyLink', {
        text: function(trigger) {
            window.tips.open('链接已复制');
            return $('#link').val();
        }
    });
});