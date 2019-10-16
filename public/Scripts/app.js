// IIFE -- Immediately Invoked Function Expression
(function () {

    function Start() {
        console.log(`%c App Started...`,
            "font-size: 20px; color: blue; font-weight: bold");

        $(".dropdown-menu a").click(function () {
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).text());
            $(this).parents(".dropdown").find('.form-control').val($(this).text());
        });

        $(".btn-danger").click(function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                window.location.assign("/order-list");
            }
        });

        $("input[type=number]").click(function(e) {
            $(this).attr('value', $(this).val());
        });
    }

    window.addEventListener("load", Start);

})();
