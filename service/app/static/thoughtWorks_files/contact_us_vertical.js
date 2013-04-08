var cobra = cobra || {};
cobra.contact_us_vertical = {
    apply_to_page: function () {

        // Mobile Selector
        $('#mobile-office-selector').change(function () {
            $('.office.active').removeClass('active');
            city = $(this).val();
            $('.office-title:contains("' + city + '")').parent('div').addClass('active');
        });

        // Desktop Selector

        // setup
        $('#desktop-office-list a.office-city').hide();
        other_cities = $('#desktop-office a.office-group.active').attr('id');
        $('#desktop-office-list a.'+ other_cities).show();

        //click on a office-city
        $('#desktop-office-list a.office-city').click(function() {
            $('#desktop-office-list a.office-city').removeClass('active');
            $(this).addClass('active');
            city = $(this).text();
            $('.office.active').removeClass('active');
            $('#vertical-offices h3:contains("'+ city +'")').parent('div').addClass('active');
        });

        //click on a office group
        $('#desktop-office a.office-group').click(function() {
            $('#desktop-office a.office-group').removeClass('active');
            $(this).addClass('active');
            cities_to_show = $(this).attr('id');
            $('#desktop-office-list a.office-city').hide()
            $('#desktop-office-list a.'+ cities_to_show).show();

            $('#desktop-office-list a.'+ cities_to_show).first().click();
        });
    }
}