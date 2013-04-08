var cobra = cobra || {};
cobra.placeholder = {
    apply_to_page : function (){
        $('select.default-placeholder').addClass('placeholder-enabled');

        $('select.default-placeholder').change(function() {
            if ($("option:selected", this).attr("default") == 'default') {
                $(this).addClass('placeholder-enabled');
            }
            else {
                $(this).removeClass('placeholder-enabled');
            }
        });
    }


}