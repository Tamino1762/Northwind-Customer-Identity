$(function () {
    getCartItems()
    function getCartItems() {
        var id = 92;
        $.getJSON({
            url: ".../../api/viewCart/" + id,
            success: function (response, textStatus, jqXhr) {
                console.log(response);

            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log("The following error has occured: " + textStatus, errorThrown);
            }
        })
    }
})