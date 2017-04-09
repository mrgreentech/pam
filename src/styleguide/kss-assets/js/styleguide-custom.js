$(function () {
    boot();

    function boot() {
        alertHandler();
    }

    function alertHandler() {
        $('[pam-Alert-Close]').on('click', function(event) {
            $(event.target).closest('[pam-Alert]')
                .text('Bye Bye!')
                .delay(500)
                .fadeOut('slow', function () {});
        });
    }
});