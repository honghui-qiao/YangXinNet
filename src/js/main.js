var navCollapsed = true,
    nav = $('#J_nav'),
    bodyWidth = $('body').width();

$(window).on('resize', function (e) {
    bodyWidth = $('body').width();

    if (bodyWidth <= 750) {
        hideNav();
    } else {
        showNav();
    }
});

function hideNav() {
    nav.hide();
    navCollapsed = true;
}

function showNav() {
    nav.fadeIn('fast');
    navCollapsed = false;
}

$('body').on('click', '#J_navTrigger', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (navCollapsed) {
        showNav();
    } else {
        hideNav();
    }
});

$('body').on('touchstart mousedown', function (e) {
    if (bodyWidth <= 750) {
        if ($(e.target).closest('#J_navTrigger,#J_nav').length > 0) {
            return;
        }

        hideNav();
    }
});
