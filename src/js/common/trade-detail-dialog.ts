$(() => {
    let tradeDetailDialog = document.querySelector('.trade-detail-dialog');

    if (tradeDetailDialog) {
        window.tradeDetailDialog = {
            el: tradeDetailDialog,
            box: null,
            content: null,
            default: { msg: '', title: '信息提示', okCB: null, cancelCB: null },
            init: function () {
                this.box = this.el.querySelector('.dialog-box');
                this.content = this.box.querySelector('.dialog-content');
                Rx.Observable.fromEvent(this.el.querySelector('.dialog-close'), 'click').subscribe(() => this.close());
                Rx.Observable.fromEvent(this.el, 'animationend').subscribe(() => this.HDText());
            },
            open: function (data = {}) {
                this.el.classList.add('active');
                this.content.innerHTML = this.getTemplate(data);
            },
            close: function () {
                if (typeof this.closeCB === 'function') this.closeCB();
                this.el.classList.remove('active');
                this.clearInlineStyle();
            },
            clearInlineStyle: function () {
                this.box.removeAttribute("style");
            },
            HDText: function () {
                // if (window.isMobile) return;
                if (this.el.classList.contains('active')) {
                    let { width, height } = this.box.getBoundingClientRect();
                    width = parseInt(width);
                    height = parseInt(height);
                    if (width % 2 === 1) width = width + 1;
                    if (height % 2 === 1) height = height + 1;
                    this.box.style.minWidth = `${width}px`;
                    this.box.style.minHeight = `${height}px`;
                }
            },
            getTemplate (data) {
                let t1 = `
                    <div>
                        <div class="row">
                            <div class="col s3">交易状态：</div>
                            <div class="col s9 s-ta-r">${data.status}</div>
                        </div>
                        <div class="row">
                            <div class="col s3">类　　型：</div>
                            <div class="col s9 s-ta-r">${data.type}</div>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col s3">金　　额：</div>
                            <div class="col s9 s-ta-r"><span class="c1">￥${data.money}</span></div>
                        </div>
                        <div class="row">
                            <div class="col s3">交易时间：</div>
                            <div class="col s9 s-ta-r">${data.dataTime}</div>
                        </div>
                        <div class="row">
                            <div class="col s3">渠道订单：</div>
                            <div class="col s9 s-ta-r">${data.order}</div>
                        </div>
                        <div class="row">
                            <div class="col s3">商　　户：</div>
                            <div class="col s9 s-ta-r">${data.merchants}</div>
                        </div>
                    </div>
                `;

                let skins = '';
                if (data.skins && data.skins.length > 0) {
                    data.skins.map(skin => {
                        skins += `
                            <tr>
                                <td>${skin.name}</td>
                                <td><span class="c1">￥${skin.money}</span></td>
                                <td>${skin.status}</td>
                            </tr>
                        `;
                    });

                    let t2 = `
                        <div>
                            <h4>充值饰品：</h4>
                            <div class="row">
                                <div class="col s12">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>饰品名称</th>
                                                <th>价值</th>
                                                <th>状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${skins}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tips">
                            状态“存入中”：系统正在为您处理存入请求，请耐心等候。由于与steam的交互可能出现异常，您的充值结果可能会出现延迟，请谅解。<br>
                            状态“交易暂挂”：该笔交易已经被steam暂挂，您可以到steam取消交易，也可等待暂挂结束，系统给您入账。
                        </div>
                    `;

                    t1 += t2;
                }

                return `<div class="trade-detail-content">${t1}</div>`
            }
        };
        window.tradeDetailDialog.init();
    }
});