$(document).ready(function () {
    $(".navMain__changeLetters__increase").click(function () {
        $('body').attr(
            'data-font-size',
            parseInt($('body').attr('data-font-size')) + 5
        );
        updateGlobalFontSize();
    });
    $(".navMain__changeLetters__reducing").click(function () {
        $('body').attr(
            'data-font-size',
            parseInt($('body').attr('data-font-size')) - 5
        );
        updateGlobalFontSize();
    });
    const updateGlobalFontSize = () => {
        //"Hack because of problem with crossbrowser compatibility in CSS attr"
        $("body").css(
            "font-size",
            parseInt($("body").attr('data-font-size')) + "%"
        );
    };
});
