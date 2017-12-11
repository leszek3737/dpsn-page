$(document).ready(function () {
    $(".navMain__changeLetters__increase").click(function () {
            const fontSize = $('body').data('font-size');
            $('body').data(
                'font-size',
                fontSize + 5
            );
            //"Hack because of problem with crossbrowser compatibility in CSS attr"
            $("body").css(
                "font-size",
                $("body").data('font-size') + "%"
            );
        }),
        $(".navMain__changeLetters__reducing").click(function () {
            const fontSize = $('body').data('font-size');
            $('body').data(
                'font-size',
                fontSize - 5
            );
            //"Hack because of problem with crossbrowser compatibility in CSS attr"
            $("body").css(
                "font-size",
                $("body").data('font-size') + "%"
            );
        })
});
