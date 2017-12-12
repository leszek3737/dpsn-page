$(document).ready(function () {
    $(".navMain__changeLetters__increase").click(function () {
        $('html').attr(
            'data-font-size',
            parseInt($('html').attr('data-font-size')) + 5
        );
        updateGlobalFontSize();
    });
    $(".navMain__changeLetters__reducing").click(function () {
        $('html').attr(
            'data-font-size',
            parseInt($('html').attr('data-font-size')) - 5
        );
        updateGlobalFontSize();
    });
    const updateGlobalFontSize = () => {
        //"Hack because of problem with crossbrowser compatibility in CSS attr"
        $("html").css(
            "font-size",
            parseInt($("html").attr('data-font-size')) + "%"
        );
    };
});
