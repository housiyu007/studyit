define(['jquery'], function($) {

    return {
        showMes: function(pathname) {
            $(".navs a[href='" + pathname + "']").addClass("active");
        }
    }
})
