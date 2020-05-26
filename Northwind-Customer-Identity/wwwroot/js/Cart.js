$(function () {
    var id = $('#cart_rows').data('id');
    discount = {
        valid: false,
        code: null,
        productId: null,
        percent: null,
    }

    getCartItems();
    function getCartItems() {
        $.getJSON({
            url: "../../api/viewCart/" + id,
            success: function (response, textStatus, jqXhr) {
                console.log(response);
                $('#cart_rows').html("");
                var cartTotal = 0;
                var cartGrandTotal = 0;
                var discountProduct = "";
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {

                        var total = response[i].quantity * response[i].product.unitPrice;
                        cartTotal += total;
                        if (discount.valid && discount.productId == response[i].product.productId) {
                            total = total * discount.percent;
                            discountProduct = response[i].product.productName;
                        }

                        var row = "<tr data-id=\"" + response[i].product.productId + "\" data-name=\"" + response[i].product.productName + "\" data-price=\"" + response[i].product.unitPrice + "\">"
                            + "<td>" + response[i].product.productName + "</td>"
                            + "<td class=\"text-right\">" + response[i].quantity + "</td>"
                            + "<td class=\"text-right\">$" + response[i].product.unitPrice + "</td>"
                            + "<td class=\"text-right\">$" + total + "</td>"
                            + "</tr>";
                        $('#cart_rows').append(row);
                        cartGrandTotal += total;
                    }
                    $('#cart-sub-total').html("");
                    $('#cart-sub-total').append("<div><h2 class=\"float-right\">Your cart sub-total is $" + cartTotal + "</h2></div>");
                    $('#discount').html("");

                    if (discount.valid && discountProduct) {
                        $('#discount').append("<div><h2 class=\"text-right discount\">You applied a " + discount.percent + "% discount  on " + discountProduct + "</h2></div>");
                    } else {
                        $('#discount').append("<div><h2 class=\"text-right discount\">No valid discount applied</h2></div>");
                    }
                    $('#cart-total').html("");
                    $('#cart-total').append("<div><h2 class=\"text-right\">Your cart grand total is $" + cartGrandTotal + "</h2></div>");
                } else {
                    $('#empty').html("");
                    $('#empty').append("<h1>Your cart is empty</h1>");
                }

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
        //alert("change")
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
        console.log("product Id: " + $('#ProductId').data('id'));
        $('#ProductId').data('id', $(this).parent().data('id'));
        console.log("product new Id: " + $('#ProductId').data('id'));

        $('#ProductId').html($(this).parent().data('id'));
        $('#ProductName').html($(this).parent().data('name'));
        $('#UnitPrice').html($(this).parent().data('price'));
        //console.log($('#deleteCartItem').attr("asp-route-ProductId"));
        //$('#deleteButton').html("");
        //$('#deleteButton').html("<button type=\"button\" class=\"btn btn-danger\" id=\"deleteCartItem\"><a asp-action=\"DeleteItem\" asp-route-ProductId=\"" + $(this).parent().data('id') + "\" asp-route-CustomerId=\"" + id + "\">Delete</a></button>");
        // calculate and display total in modal
        $('#Quantity').change();
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

    $('#editCart').on('click', function () {
        //console.log($('#Quantity').val());
        $('#cartModal').modal('hide');
        // AJAX to update database
        $.ajax({
            headers: { "Content-Type": "application/json" },
            url: "../../api/editcart/" + id,
            type: 'post',
            data: JSON.stringify({
                "id": $('#ProductId').html(),
                "email": "empty",
                "qty": $('#Quantity').val()
            }),
            success: function (response, textStatus, jqXhr) {
                // success
                //toast("Product edited", response.product.productName + " successfully edited product.");
                getCartItems();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                toast("Error", "Please try again later.");
                console.log("The following error occured: " + jqXHR.status, errorThrown);
            }
        });
    });

    function toast(header, message) {
        $('#toast_header').html(header);
        $('#toast_body').html(message);
        $('#cart_toast').toast({ delay: 2500 }).toast('show');
    }

    $('#deleteCartItem').on('click', function () {
        location.href = "/Cart/DeleteItem?ProductId=" + $('#ProductId').data('id') + "&CustomerId=" + id;
    });

    $('#pay').on('click', function () {
        location.href = "/Cart/pay?CustomerId=" + id;
    });

    $('#checkDiscount').on('click', function () {

        discount.code = Number($('#discountCode').val());

        switch (discount.code) {
            case 3333:
                discount.valid = true;
                discount.productId = 3;
                discount.percent = .25;
                break;
            case 3434:
                discount.valid = true;
                discount.productId = 34;
                discount.percent = .10;
                break;
            case 4444:
                discount.valid = true;
                discount.productId = 4;
                discount.percent = .125;
                break;
            case 1515:
                discount.valid = true;
                discount.productId = 15;
                discount.percent = .10;
                break;
            case 2727:
                discount.valid = true;
                discount.productId = 27;
                discount.percent = .50;
                break;
            case 7777:
                discount.valid = true;
                discount.productId = 7;
                discount.percent = .15;
                break;
            case 4040:
                discount.valid = true;
                discount.productId = 40;
                discount.percent = .30;
                break;
            case 4400:
                discount.valid = true;
                discount.productId = 44;
                discount.percent = .25;
                break;
            case 4900:
                discount.valid = true;
                discount.productId = 49;
                discount.percent = .10;
                break;
            case 5700:
                discount.valid = true;
                discount.productId = 57;
                discount.percent = .15;
                break;
            case 6200:
                discount.valid = true;
                discount.productId = 62;
                discount.percent = .30;
                break;
            case 6300:
                discount.valid = true;
                discount.productId = 63;
                discount.percent = .40;
                break;
            case 6500:
                discount.valid = true;
                discount.productId = 65;
                discount.percent = .25;
                break;
            case 6900:
                discount.valid = true;
                discount.productId = 69;
                discount.percent = .12;
                break;
            case 7300:
                discount.valid = true;
                discount.productId = 73;
                discount.percent = .05;
                break;
            case 1111:
                discount.valid = true;
                discount.productId = 1;
                discount.percent = .25;
                break;
            default:
                console.log("Invalid Code");
        }

        if (discount.valid) {
            getCartItems();
        } else {
            getCartItems();
            console.log("Invalid Code" + discount.code);
        }
    });
});