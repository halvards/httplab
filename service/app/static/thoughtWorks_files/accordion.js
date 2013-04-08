

var cobra = cobra || {};
cobra.accordion = {
    apply_to_page: function(animationTime) {
        $("ul.accordion li .accordion-body").hide();

        $("ul.accordion li .accordion-header").click(function() {
            if ($(this).hasClass("active")) {
                $("ul.accordion .accordion-body").slideUp(animationTime);
                $("ul.accordion li .accordion-header").removeClass("active");
            } else {
                $("ul.accordion .accordion-body").slideUp(animationTime);
                $("ul.accordion li .accordion-header").removeClass("active");
                $(this).toggleClass("active");
                $(this).parent().find(".accordion-body").slideToggle(animationTime);
            }
        });
    }
}

