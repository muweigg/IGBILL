$(() => {
    let phoneValid = $('p.valid a');

    window.notice.open('你可以创建一个属于自己的房间，将自己igxe库存中的饰品作为礼物发放给参与你活动的用户');
    
    phoneValid.click(() => window.phoneValidDialog.open());
});