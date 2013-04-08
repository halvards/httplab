var cobra = cobra || {};
cobra.cookie_banner = {
    apply_to_page: function() {
        $('#cookie-banner-close-button').click(function(e) {
            e.preventDefault();
            $('#cookie-banner-wrapper').hide();
        });
    }
}