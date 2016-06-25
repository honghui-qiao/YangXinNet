var EventUtil = {
    on: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    off: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }
};

var trigger = document.getElementById('J_navTrigger'),
    navCollapsed = true,
    nav = document.getElementById('J_nav');

EventUtil.on(trigger, 'click', function (e) {
    e.preventDefault();
    if (navCollapsed) {
        showNav();
    } else {
        hideNav();
    }
});
EventUtil.on(window, 'resize', function (e) {
    if (document.body.clientWidth <= 750) {
        hideNav();
    } else {
        showNav();
    }
});
EventUtil.on(nav, 'click', function (e) {
    hideNav();
});

function hideNav() {
    nav.style.display = "none";
    navCollapsed = true;
}
function showNav() {
    nav.style.display = "block";
    navCollapsed = false;
}