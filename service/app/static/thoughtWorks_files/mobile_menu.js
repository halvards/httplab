function toggle_mobile_menu(){
$('#tab-nav-list').click(function(){
    $('#menu').toggle();
    if($('#menu').is(":visible")) {
        $('#tab-nav-list').removeClass('not-selected');
    }
    else {
        $('#tab-nav-list').addClass('not-selected');
    }
});
}