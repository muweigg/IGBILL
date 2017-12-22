
$(() => {
    window.tips = {
        el: null,
        open: function(msg: string = '', duration: number = 3000) {
            if (this.el) this.el.remove();
            this.el = $(`
                <div class="tips-message">
                    <span>${msg}</span>
                </div>
            `).css({opacity: 0});
            $('body').append(this.el);
            this.el.animate({ opacity: 1, })
                .delay(duration)
                .animate({ opacity: 0, }, 300, () => this.el.remove());
        }
    }
});
