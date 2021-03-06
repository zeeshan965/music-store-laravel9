/**
 * @param url
 * @param type
 * @param body
 * @returns {*}
 */
function sendAjaxRequest(url, type, body) {
    return fetch(url, {
        method: type, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        body: body
    }).then((response) => {
        return response.json();
    });
}

/**
 * @param error
 */
function showErrors(error) {
    swal({
        title: "Error!",
        text: "Something went wrong, Please contact support!",
        type: "error",
        confirmButtonColor: "#DD6B55",
    });
}

/**
 * @param message
 * @param redirect_to
 */
function successMessage(message, redirect_to) {
    swal({
        title: "SUCCESS!",
        text: message,
        type: "success",
        confirmButtonColor: "#566b8a",
        closeOnConfirm: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
    }, function () {
        window.location.assign(redirect_to);
    });
}

/**
 * @param errors
 */
function errorMessage(errors) {
    let html = '';
    if (typeof (errors.message) !== 'undefined') {
        html = '<p>' + errors.message + '</p>';
    }

    swal({
        html: true,
        title: "Error!",
        text: html,
        type: "warning",
        confirmButtonColor: "#DD6B55",
    });
}

/**
 *
 * @param errors
 */
function errorMessages(errors) {
    let html = '';
    if (typeof (errors.messages) !== 'undefined') {
        for (let item in errors.messages) {
            html += '<p>' + errors.messages[item] + '</p>';
        }
    }
    if (typeof (errors.errors) !== 'undefined') {
        for (let item in errors.errors) {
            html += '<p>' + errors.errors[item][0] + '</p>';
        }
    }

    swal({
        html: true,
        title: "Error!",
        text: html,
        type: "warning",
        confirmButtonColor: "#DD6B55",
    });
}

function showLoader() {
    let elem = $('.ladda-button-demo'), lada = elem.ladda();
    lada.ladda('start');
    $(".ladda-spinner").addClass("spinner-override");
    $(elem).addClass("ladda-bg-clear");
}

function hideLoader() {
    let elem = $('.ladda-button-demo'), lada = elem.ladda();
    lada.ladda('stop');
    $(".ladda-spinner").removeClass("spinner-override");
    $(elem).removeClass("ladda-bg-clear");
}
