$(function () {
    getCartItems();
    function getCartItems() {
        var id = $('#cart_rows').data('id');

        $.getJSON({
            url: "../../api/viewCart/" + id,
            success: function (response, textStatus, jqXhr) {
                console.log(response);
                $('#cart_rows').html("");
                var cartTotal = 0;
                for (var i = 0; i < response.length; i++) {
                    var total = response[i].quantity * response[i].product.unitPrice;
                    var row = "<tr" + " data-id=\"" + response[i].product.productId + "\" data-name=\"" + response[i].product.productName + "\" data-price=\"" + response[i].product.unitPrice + "\">"
                        + "<td>" + response[i].product.productName + "</td>"
                        + "<td class=\"text-right\">"  + response[i].quantity + "</td>"
                        + "<td class=\"text-right\">" + response[i].product.unitPrice + "</td>"
                        + "<td class=\"text-right\">$" + total + "</td>"
                        + "</tr>";
                    $('#cart_rows').append(row);
                    cartTotal += total;
                }
                $('#cart-total').append("<div class=\"float-right\">" + "<h2>your cart total is $" + cartTotal + "</h2></div>");

            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log("The following error has occured: " + textStatus, errorThrown);
            }
        })
    }

    //// update total when cart quantity is changed
    $('#Quantity').change(function () {
        //update total
        //update overalltotal
        alert("change")
        var total = parseInt($(this).val() * 2);
        //var total = parseInt($(this).val()) * parseFloat($('#UnitPrice').html());
        $('#Total').html(numberWithCommas(total.toFixed(2)));
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $('#Discontinued').on('change', function () {
        getProducts();
    });

    // delegated event listener
    $('#cart_rows').on('click', 'td', function () {
        //alert("clicked");
        // make sure a customer is logged in
       
            $('#ProductId').html($(this).data('id'));
            $('#ProductName').html($(this).data('name'));
            $('#UnitPrice').html($(this).data('price'));
            // calculate and display total in modal
            //$('#Quantity').change();
            $('#cartModal').modal();
       

    });

    // update total when cart quantity is changed
    $('#Quantity').change(function () {
        var total = parseInt($(this).val()) * parseFloat($('#UnitPrice').html());
        $('#Total').html(numberWithCommas(total.toFixed(2)));
    });

    // function to display commas in number
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $('#addToCart').on('click', function () {
        $('#cartModal').modal('hide');
        // AJAX to update database
        $.ajax({
            headers: { "Content-Type": "application/json" },
            url: "../../api/addtocart",
            type: 'post',
            data: JSON.stringify({
                "id": $('#ProductId').html(),
                "email": $('#User').data('email'),
                "qty": $('#Quantity').val()
            }),
            success: function (response, textStatus, jqXhr) {
                // success
                toast("Product Added", response.product.productName + " successfully added to cart.");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                toast("Error", "Please try again later.");
                console.log("The following error occured: " + jqXHR.status, errorThrown);
            }
        });
    });

    //$('#cart_rows').on('click', 'tr', function () {
    //    alert("clicked on " + $(this).data('name'));
    //        $('#ProductId').html($(this).data('id'));
    //        $('#ProductName').html($(this).data('name'));
    //        $('#UnitPrice').html($(this).data('price').toFixed(2));
    //        // calculate and display total in modal
    //        $('#Quantity').change();
    //        $('#cartModal').modal();
    //});
});