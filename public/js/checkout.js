(function () {
    let price = 0, id = 0;
    if ($("#smart-button-container").length === 1) initPayPalButton();
})();

/**
 *@param elem
 */
function renderAttributes(elem) {
    id = elem.attr("data-id");
    const thumbnail = elem.attr("data-thumbnail");
    const title = elem.attr("data-title");
    price = elem.attr("data-price");
    $('.modal-title').text(title);
    $('.modal-body p').text(title);
    $('.modal-body #rent-price').text("$" + price);
    $('.modal-body .img-responsive img').attr("src", thumbnail);
}

/**
 * PayPal Checkout
 */
function initPayPalButton() {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',

        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    "amount": {
                        "currency_code": "USD",
                        "value": price
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
                console.log(orderData);
                dispatchPaymentInformation(orderData);
            });
        },
        onError: function (err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}

/**
 * @param orderData
 */
function dispatchPaymentInformation(orderData) {
    const formData = new FormData();
    formData.append("payment_data", JSON.stringify(orderData));
    formData.append("id", id);
    sendAjaxRequest('payment', 'post', formData).then((response) => {
        if (typeof (response.status) !== 'undefined' && response.status == 'success') {
            successMessage('Thank you for your payment!', window.location.origin + "/dashboard")
            $('#rent-music-modal').modal("toggle");
        } else {
            //validation errors
            errorMessages(response);
        }
    }).catch(err => {
        showErrors(err)
    });
}

$('.rent-music').on("click", function (e) {
    renderAttributes($(this));
    $('#rent-music-modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
})

