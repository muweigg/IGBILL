$(() => {
    let toastContainer = document.querySelector('.toast-container');

    if (toastContainer) {
        window.toast = {
            container: toastContainer,
            default: { duration: 3000, classes: '' },
            init: function () {
                $(this.container).on('click', '.toast-message .toast-close', function () {
                    let message = $(this).parent().parent();
                    message.stop().animate({
                        opacity: 0,
                        left: '100%'
                    }, 300, () => message.remove());
                });
            },
            addToast: function(msg: string = '', options: any = {}) {
                let opt = Object.assign({}, this.default, options);
                let html = $(`
                    <div class="toast-message ${opt.classes}">
                        <span>${msg}<a href="javascript:" class="toast-close">×</a></span>
                    </div>
                `).css({left: '100%', opacity: 0});
                $(this.container).append(html);
                html.animate({
                    opacity: 1,
                    left: '0'
                }).delay(opt.duration).animate({
                    opacity: 0,
                    left: '100%'
                }, 300, () => html.remove());
            }

        }

        window.toast.init();
    }
});