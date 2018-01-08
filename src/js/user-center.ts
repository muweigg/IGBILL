$(() => {
    let phoneValid = $('p.valid a');

    window.notice.open('你可以创建一个属于自己的房间，将自己igxe库存中的饰品作为礼物发放给参与你活动的用户');
    
    phoneValid.click(() => window.phoneValidDialog.open());

    let data = {
        status: '交易成功',
        type: '饰品充值',
        money: 150,
        dataTime: '2018-01-03 09:50:13',
        order: 'NY67895412235455568778631',
        merchants: '充值商户',
        skins: [
            {
                name: '双持贝瑞塔 | 黑榄仁木 (战痕累累)',
                money: 150,
                status: '存入成功'
            },
            {
                name: '双持贝瑞塔 | 黑榄仁木 (战痕累累)',
                money: 150,
                status: '存入成功'
            }
        ]
    }
    $('.list-data').on('click', 'a', () => window.tradeDetailDialog.open(data));
});