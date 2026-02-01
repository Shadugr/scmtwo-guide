document.addEventListener("DOMContentLoaded", function () {
    var title = document.querySelector(".md-header__title");
    var logo = document.querySelector(".md-header__button.md-logo");

    if (title && logo) {
        title.addEventListener("click", function () {
            window.location.href = logo.href;
        });
        title.setAttribute("title", logo.getAttribute("title") || "Home");
    }
});
