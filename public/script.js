const menu = $(".menu");
const navItems = $(".nav-items");

menu.click(function () {
    if (navItems.hasClass("active")) {
        navItems.removeClass("active");
    }
    else {
        navItems.addClass("active");
    }
});