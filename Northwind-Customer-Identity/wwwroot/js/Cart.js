$(function () {
    getCartItems()
    function getCartItems() {
        var id = 92; //how to get current user instead?
        $.getJSON({
            url: "../../api/viewCart/" + id,
            success: function (response, textStatus, jqXhr) {
                console.log(response);
                //$('#product_rows').html("");
                for (var i = 0; i < response.length; i++) {
                    //var css = response[i].discontinued ? " class=\"discontinued\"" : "";
                    //var row = "<tr" + css + " data-id=\"" + response[i].productId + "\" data-name=\"" + response[i].productName + "\" data-price=\"" + response[i].unitPrice + "\">"
                    //    + "<td>" + response[i].productName + "</td>"
                    //    + "<td class=\"text-right\">$" + response[i].unitPrice.toFixed(2) + "</td>"
                    //    + "<td class=\"text-right\">" + response[i].unitsInStock + "</td>"
                    //    + "</tr>";
                    //$('#product_rows').append(row);
                }

            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log("The following error has occured: " + textStatus, errorThrown);
            }
        })
    }

    $('#product_rows').on('click', 'tr', function () {
        // make sure a customer is logged in
        if ($('#User').data('customer').toLowerCase() == "true") {
            $('#ProductId').html($(this).data('id'));
            $('#ProductName').html($(this).data('name'));
            $('#UnitPrice').html($(this).data('price').toFixed(2));
            // calculate and display total in modal
            $('#Quantity').change();
        } else {
            toast("Access Denied", "You must be signed in as a customer to access the cart.");
        }

    });
})